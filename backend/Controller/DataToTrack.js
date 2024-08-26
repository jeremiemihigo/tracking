const modelClient = require("../Model/Tracker/Client");

module.exports = {
  ReadData: (req, res) => {
    try {
      modelClient
        .aggregate([
          { $match: { active: true } },
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
            return res.status(200).json(result.reverse());
          } else {
            return res.status(201).json([]);
          }
        })
        .catch(function (err) {
          return res.status(201).json("Error " + err);
        });
    } catch (error) {
      return res.status(201).json("Error " + error);
    }
  },
};
