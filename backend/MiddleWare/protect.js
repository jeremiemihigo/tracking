const jwt = require("jsonwebtoken");
const ModelAgentAdmin = require("../Model/AgentAdmin");
const { ObjectId } = require("mongodb");
const _ = require("lodash");

module.exports = {
  protect: async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(201).json("token expired");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded?.id) {
        return res.status(201).json("token expired");
      }
      ModelAgentAdmin.findOne({ _id: new ObjectId(decoded.id), active: true })
        .then((user) => {
          if (user) {
            req.user = user;
            next();
          } else {
            return res.status(201).json("token expired");
          }
        })
        .catch(function (err) {
          return res.status(201).json("token expired");
        });
    } catch (error) {
      return res.status(201).json("token expired");
    }
  },
  readUser: (req, res) => {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (token === "null") {
        return res.status(201).json("token expired");
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(201).json("token expired");
      }

      ModelAgentAdmin.aggregate([
        { $match: { _id: new ObjectId(decoded.id), active: true } },
        {
          $lookup: {
            from: "roles",
            localField: "codeAgent",
            foreignField: "members",
            as: "fonctio",
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "fonction",
            foreignField: "id",
            as: "roleAgent",
          },
        },
        { $unwind: "$roleAgent" },
        { $project: { password: 0 } },
      ])
        .then((response) => {
          if (response.length === 1) {
            let table = [];
            for (let i = 0; i < response[0].fonctio.length; i++) {
              table.push(response[0].fonctio[i].id);
            }
            let donner = response[0];
            donner.role = response[0].fonction;
            donner.fonction = table;
            return res.status(200).json(donner);
          } else {
            return res.status(201).json("token expired");
          }
        })
        .catch(function (err) {
          return res.status(201).json("token expired");
        });
    } catch (error) {}
  },
};
