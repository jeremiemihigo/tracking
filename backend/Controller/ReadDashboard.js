const modelClient = require("../Model/Tracker/Client");
const modelStatus = require("../Model/Tracker/Status");
const modelRole = require("../Model/Tracker/Role");
const modelAgent = require("../Model/AgentAdmin");
const asyncLab = require("async");

module.exports = {
  ReadAction: (req, res, next) => {
    try {
      const { codeAgent } = req.user;
      asyncLab.waterfall([
        function (done) {
          modelRole
            .find({ members: { $in: codeAgent } })
            .lean()
            .then((role) => {
              if (role.length > 0) {
                let table = [];
                for (let i = 0; i < role.length; i++) {
                  table.push(role[i].id);
                }
                done(null, table);
              } else {
                const data = {
                  user: req.user,
                  status: [],
                };
                req.donner = data;
                next();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        function (role, done) {
          modelStatus
            .find({ role: { $in: role } })
            .lean()
            .then((result) => {
              if (result.length > 0) {
                let table = [];
                for (let i = 0; i < result.length; i++) {
                  table.push(result[i].idStatus);
                }
                const data = {
                  user: req.user,
                  status: table,
                };
                req.donner = data;
                next();
              } else {
                const data = {
                  user: req.user,
                  status: [],
                };
                req.donner = data;
                next();
              }
            });
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  },
  Read: (req, res) => {
    try {
      const recherche = req.recherche;
      const match = recherche ? recherche : { $match: { active: true } };
      modelClient
        .aggregate([
          match,
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
          return res.status(200).json(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },
  //Fonction process officer
  DashboardAgent: (req, res, next) => {
    try {
      const { codeAgent, roles } = req.body;
      asyncLab.waterfall([
        function (done) {
          modelRole
            .find({ members: { $in: codeAgent } })
            .lean()
            .then((role) => {
              if (role.length > 0) {
                let table = [];
                for (let i = 0; i < role.length; i++) {
                  table.push(role[i].id);
                }
                done(null, table);
              } else {
                return res
                  .status(201)
                  .json("The agent is not assigned to a role");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        function (role, done) {
          modelStatus
            .find({ role: { $in: role } })
            .lean()
            .then((result) => {
              if (result.length > 0) {
                let table = [];
                for (let i = 0; i < result.length; i++) {
                  table.push(result[i].idStatus);
                }

                done(null, table);
              } else {
                return res
                  .status(201)
                  .json("No status assigned to the agent role");
              }
            });
        },
        function (status, done) {
          const recherche = {
            $match: {
              active: true,
              shop_region: { $in: agent.region },
              statusEnCours: { $in: status },
            },
          };
          req.recherche = recherche;
          next();
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  },
};
