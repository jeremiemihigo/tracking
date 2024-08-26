const modelClient = require("../Model/Tracker/Client");
const asyncLab = require("async");
const { ObjectId } = require("mongodb");
const modelCorbeille = require("../Model/Tracker/Corbeille");

module.exports = {
  Clients: (req, res) => {
    try {
      const { data } = req.body;
      asyncLab.waterfall([
        function (done) {
          modelClient
            .insertMany(data)
            .then((result) => {
              if (result) {
                return res.status(200).json("Enregistrement effectuer");
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  },
  AddOneClient: (req, res) => {
    try {
      const { codeAgent } = req.user;
      const {
        unique_account_id,
        customer_name,
        shop_name,
        shop_region,
        par_to_date,
        statusEnCours,
        commentaire,
        role,
      } = req.body;
      if (
        !unique_account_id ||
        !customer_name ||
        !commentaire ||
        !role ||
        !shop_name ||
        !shop_region ||
        !par_to_date ||
        !statusEnCours
      ) {
        return res.status(404).json("Veuillez renseigner les champs");
      }
      asyncLab.waterfall(
        [
          function (done) {
            modelClient
              .findOne({ unique_account_id, active: true })
              .lean()
              .then((client) => {
                if (client) {
                  return res
                    .status(404)
                    .json("Le client est en cours de processus");
                } else {
                  done(null, true);
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          },
          function (client, done) {
            modelClient
              .create({
                unique_account_id,
                customer_name,
                shop_name,
                shop_region,
                par_to_date,
                beginStatus: statusEnCours,
                statusEnCours,
                updatedAt: new Date().toISOString().split("T")[0],
                provenance: {
                  codeAgent,
                  commentaire,
                  role,
                },
              })
              .then((result) => {
                if (result) {
                  done(result);
                } else {
                  return res.status(404).json("Error");
                }
              })
              .catch(function (err) {
                return res.status(404).json("Erreur " + err);
              });
          },
        ],
        function (client) {
          modelClient
            .aggregate([
              { $match: { _id: new ObjectId(client?._id) } },
              {
                $lookup: {
                  from: "status",
                  localField: "statusEnCours",
                  foreignField: "idStatus",
                  as: "status",
                },
              },
              { $unwind: "$status" },
            ])
            .then((result) => {
              if (result.length > 0) {
                return res.status(200).json(result[0]);
              } else {
                return res.status(404).json("");
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  PostStatus: (req, res) => {
    try {
      const {
        commentaire,
        customer_id,
        titleFeedback,
        feedbackSelect,
        status,
        role,
      } = req.body;
      const { codeAgent } = req.user;
      const io = req.io;
      asyncLab.waterfall(
        [
          function (done) {
            modelClient
              .findOne({
                unique_account_id: customer_id,
                statusEnCours: status.idStatus,
                active: true,
              })
              .lean()
              .then((result) => {
                if (result) {
                  done(null, result);
                } else {
                  return res.status(201).json("Client introuvable");
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          },

          function (result, done) {
            modelClient
              .findByIdAndUpdate(
                result._id,
                {
                  $push: {
                    result: {
                      feedbackSelect: titleFeedback,
                      commentaire,
                      customer_id,
                      status: status?.title,
                      role,
                      dateDebut: result?.updatedAt,
                      delaiPrevu: status?.sla,
                      dateFin: new Date().toISOString().split("T")[0],
                      codeAgent,
                    },
                  },
                  $set: {
                    statusEnCours: feedbackSelect,
                    updatedAt: new Date().toISOString().split("T")[0],
                  },
                },
                { new: true }
              )
              .then((response) => {
                done(null, response);
              })
              .catch(function (err) {
                console.log(err);
                return res.status(201).json("Error " + err);
              });
          },
          function (client, done) {
            modelClient
              .aggregate([
                { $match: { _id: new ObjectId(client._id) } },

                {
                  $lookup: {
                    from: "status",
                    localField: "statusEnCours",
                    foreignField: "idStatus",
                    as: "status",
                  },
                },
                { $unwind: "$status" },
                {
                  $lookup: {
                    from: "processes",
                    localField: "status.idProcess",
                    foreignField: "idProcess",
                    as: "process",
                  },
                },

                { $unwind: "$process" },
                {
                  $lookup: {
                    from: "statuslabels",
                    localField: "status.idStatus",
                    foreignField: "idStatus",
                    as: "statusLabel",
                  },
                },
                {
                  $lookup: {
                    from: "roles",
                    localField: "status.role",
                    foreignField: "id",
                    as: "role",
                  },
                },
                {
                  $addFields: {
                    id: "$_id",
                    statusTitle: "$status.title",
                    processTitle: "$process.title",
                  },
                },
              ])
              .then((response) => {
                if (response.length > 0) {
                  done(response);
                }
              });
          },
        ],
        function (client) {
          if (client) {
            let result = { content: client, error: "success" };
            io.emit("renseigne", result);
            return res.status(200).json("Operation effectuee");
          } else {
            return res.status(201).json("Error");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  ChangeByFile: (req, res) => {
    try {
      const { data } = req.body;
      if (data.length < 0) {
        return res.status(201).json("Error");
      }
      const { codeAgent } = req.user;
      const io = req.io;
      asyncLab.waterfall([
        function (done) {
          for (let i = 0; i < data.length; i++) {
            modelClient
              .findOneAndUpdate(
                {
                  unique_account_id: data[i].customer_id,
                  active: true,
                },
                {
                  $push: {
                    result: {
                      feedbackSelect: data[i].feedbackSelect,
                      dateDebut: data[i].datedebut,
                      delaiPrevu: data[i].delaiPrevu,
                      dateFin: new Date().toISOString().split("T")[0],
                      commentaire: data[i].commentaire,
                      status: data[i].status,
                      role: data[i].role,
                      codeAgent: data[i].codeAgent,
                    },
                  },
                  $set: {
                    statusEnCours: data[i].idStatus,
                    updatedAt: new Date().toISOString().split("T")[0],
                  },
                },
                { new: true }
              )
              .then((result) => {})
              .catch(function (err) {
                console.log(err);
              });
          }
          done(null, true);
        },
        function (value, done) {
          modelCorbeille
            .create({
              texte: `changement des status pour ${data.length} clients`,
              agentEffectuant: codeAgent,
            })
            .then((result) => {
              if (result) {
                io.emit("corbeille", result);
                return res
                  .status(200)
                  .json(
                    `vouz venez de modifier le status de ${data.length} clients`
                  );
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        },
      ]);
    } catch (error) {
      return res.status(201).json("" + error);
    }
  },
  ReadCorbeille: (req, res) => {
    const { codeAgent, operation } = req.user;
    let recherche = operation === "suivi" ? {} : { agentEffectuant: codeAgent };
    modelCorbeille
      .find(recherche)
      .sort({ createdAt: -1 })
      .limit(7)
      .then((result) => {
        if (result) {
          return res.status(200).json(result);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
