const modelClient = require("../Model/Tracker/Client");
const { periode } = require("../Static/fonction");
const modelStatus = require("../Model/Tracker/Status");
const modelRole = require("../Model/Tracker/Role");
const asyncLab = require("async");

module.exports = {
  ReadAction: (req, res, next) => {
    try {
      asyncLab.waterfall([
        function (done) {
          modelRole
            .find({ members: { $in: req.user.codeAgent } })
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
      const match = recherche ? recherche : { $match: {} };
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
  Rs_SM: (req, res) => {
    try {
      const recherche = req.recherche;
      modelClient
        .aggregate([
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
          recherche,
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
  //Fonction ZBM
  ReadZBM: (req, res, next) => {
    try {
      const { user, status } = req.donner;
      const recherche = {
        $match: {
          $or: [
            { active: true, shop_region: { $in: user.region } },
            { statusEnCours: { $in: status } },
          ],
        },
      };
      req.recherche = recherche;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  //Fonction process officer
  ReadProcessOfficer: (req, res, next) => {
    try {
      const { user, status } = req.donner;
      const recherche = {
        $match: {
          active: true,
          shop_region: { $in: user.region },
          statusEnCours: { $in: status },
        },
      };
      req.recherche = recherche;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  //Fonction Call operator
  ReadCallOperator: (req, res, next) => {
    try {
      const { user } = req.donner;
      const recherche = {
        $match: {
          active: true,
          statusEnCours: { $in: user?.mystatus },
        },
      };
      req.recherche = recherche;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  //Fonction Shop manager
  ReadShopManager: (req, res, next) => {
    try {
      const { user, status } = req.donner;
      const recherche = {
        $match: {
          $or: [
            {
              person_in_charge: {
                $in: ["Tech", "Tech Volant"],
              },
              visited: "nVisited",
            },
            { statusEnCours: { $in: status } },
          ],
          shop_name: { $in: user.shop },
          active: true,
        },
      };
      req.recherche = recherche;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  // Fonction RS
  ReadRS: (req, res, next) => {
    try {
      const { user, status } = req.donner;
      const recherche = {
        $match: {
          $or: [
            {
              person_in_charge: {
                $in: ["PA", "PA Volant", "Tech", "Tech Volant"],
              },
              visited: "nVisited",
            },
            { statusEnCours: { $in: status } },
          ],
          shop_name: { $in: user.shop },
          active: true,
        },
      };
      req.recherche = recherche;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  //Read Call center managment, Portfolio Managment, FraudManagment
  ReadManagment: (req, res, next) => {
    try {
      const { status } = req.donner;
      const recherche = {
        $match: {
          active: true,
          statusEnCours: { $in: status },
        },
      };
      req.recherche = recherche;
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
