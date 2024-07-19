const modelStatus = require("../Model/Tracker/Status");
const { generateString } = require("../Static/fonction");
const modelLabel = require("../Model/Tracker/StatutLabel");
const asyncLab = require("async");

module.exports = {
  AddStatus: (req, res, next) => {
    try {
      const { title, idProcess, instruction, role, sla } = req.body;
      const { codeAgent } = req.user;
      const idStatus = generateString(5);
      if (!title || !idProcess || !role || !sla) {
        return res.status(404).json("please fill in the main process");
      }

      asyncLab.waterfall([
        function (done) {
          modelStatus
            .create({
              idProcess,
              savedBy: codeAgent,
              title,
              role,
              instruction,
              sla,
              idStatus,
            })
            .then((result) => {
              if (result) {
                done(null, result);
              } else {
                return res.status(404).json("registration error");
              }
            })
            .catch(function (err) {
              return res.status(404).json("Error");
            });
        },
        function (status, done) {
          modelLabel
            .create({
              title: status.title,
              idStatus: status.idStatus,
              idLabel: generateString(5),
              savedBy: codeAgent,
            })
            .then((response) => {
              if (response) {
                req.recherche = status.idStatus;
                next();
              }
            })
            .catch(function (err) {
              return res.status(404).json("Error");
            });
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  },

  ReadStatus: (req, res) => {
    try {
      const recherche = req.recherche;
      let match = recherche
        ? { $match: { idStatus: recherche } }
        : { $match: {} };

      modelStatus
        .aggregate([
          match,
          {
            $lookup: {
              from: "processes",
              localField: "idProcess",
              foreignField: "idProcess",
              as: "process",
            },
          },
          {
            $unwind: "$process",
          },
          {
            $lookup: {
              from: "roles",
              localField: "role",
              foreignField: "id",
              as: "roles",
            },
          },
          {
            $lookup: {
              from: "actions",
              localField: "idStatus",
              foreignField: "idStatus",
              as: "actions",
            },
          },
          {
            $lookup: {
              from: "statuslabels",
              localField: "idStatus",
              foreignField: "idStatus",
              as: "label",
            },
          },
        ])
        .then((result) => {
          if (result.length > 0) {
            let data = recherche ? result[0] : result.reverse();
            return res.status(200).json(data);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  },
  EditStatus: (req, res, next) => {
    try {
      const { title, idProcess, role, sla, instruction, id } = req.body;
      if (!role || !title || !idProcess || !sla || !id) {
        return res.status(404).json("Error");
      }
      modelStatus
        .findByIdAndUpdate(
          id,
          { $set: { title, idProcess, role, sla, instruction } },
          { new: true }
        )
        .then((result) => {
          if (result) {
            req.recherche = result.idStatus;
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
};
