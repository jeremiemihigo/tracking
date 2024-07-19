const { ObjectId } = require("mongodb");
const ModelAgentAdmin = require("../Model/AgentAdmin");
const asyncLab = require("async");

module.exports = {
  //Corbeille done
  AddAdminAgent: (req, res, next) => {
    try {
      const { nom, code, fonction, operation, monitoring } = req.body;
      const { codeAgent } = req.user;
      if (!nom || !code || !fonction || !monitoring) {
        return res.status(404).json("Please fill in the fields");
      }
      asyncLab.waterfall(
        [
          function (done) {
            ModelAgentAdmin.findOne({ codeAgent: code })
              .then((agent) => {
                if (agent) {
                  return res.status(404).json("this code already exists");
                } else {
                  done(null, agent);
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          },
          function (agent, done) {
            ModelAgentAdmin.create({
              nom,
              password: "1234",
              savedBy: codeAgent,
              fonction,
              codeAgent: code,
              operation,
              monitoring,
              id: new Date(),
            })
              .then((result) => {
                done(result);
              })
              .catch(function (err) {
                if (err) {
                  return res.status(404).json("Error");
                }
              });
          },
        ],
        function (result) {
          if (result) {
            req.recherche = result._id;
            next();
          } else {
            return res.status(404).json("Erreur d'enregistrement");
          }
        }
      );
    } catch (error) {
      return res.status(404).json("Error");
    }
  },
  ReadAgent: (req, res) => {
    try {
      const recherche = req.recherche;
      let match = recherche
        ? { $match: { _id: new ObjectId(recherche) } }
        : { $match: {} };

      ModelAgentAdmin.aggregate([
        match,
        {
          $lookup: {
            from: "roles",
            localField: "fonction",
            foreignField: "id",
            as: "fonct",
          },
        },
      ])
        .then((result) => {
          if (result.length > 0) {
            let data = recherche ? result[0] : result.reverse();
            return res.status(200).json(data);
          } else {
            return res.status(404).json("Error");
          }
        })
        .catch(function (err) {
          return res.status(404).json("Error " + err);
        });
    } catch (error) {
      console.log(error);
    }
  },
  AddmyStatus: (req, res, next) => {
    try {
      const { id, status, region, shop } = req.body;
      ModelAgentAdmin.findByIdAndUpdate(
        id,
        { mystatus: status, region, shop },
        { new: true }
      )
        .then((result) => {
          if (result) {
            req.recherche = id;
            next();
          } else {
            return res.status(404).json("Error");
          }
        })
        .catch(function (err) {
          return res.status(404).json("Error " + err);
        });
    } catch (error) {
      console.log(error);
    }
  },
  //Corbeille done
};
