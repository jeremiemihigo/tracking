const modelProcess = require("../Model/Tracker/Process");
const asyncLab = require("async");
const { generateString } = require("../Static/fonction");
const _ = require("lodash");

module.exports = {
  AddProcess: (req, res, next) => {
    try {
      const { title } = req.body;

      const { codeAgent } = req.user;
      const idProcess = generateString(4);
      if (!title) {
        return res.status(201).json("please fill in the main process");
      }

      modelProcess
        .create({
          savedBy: codeAgent,
          title,
          idProcess,
        })
        .then((result) => {
          if (result) {
            req.recherche = result.idProcess;
            next();
          } else {
            return res.status(201).json("registration error");
          }
        })
        .catch(function (err) {
          return res.status(201).json("Error");
        });
    } catch (error) {
      console.log(error);
    }
  },
  UpdateProcess: (req, res, next) => {
    try {
      const { title, _id, statut } = req.body;
      if (!title || !_id || !statut) {
        return res.status(201).json("please enter the title");
      }
      asyncLab.waterfall(
        [
          function (done) {
            modelProcess
              .findById(_id)
              .lean()
              .then((process) => {
                if (process) {
                  done(null, process);
                } else {
                  return res.status(201).json("process not found");
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          },
          function (process, done) {
            modelProcess
              .findByIdAndUpdate(
                process._id,
                { $set: { title } },
                { new: true }
              )
              .then((result) => {
                if (result) {
                  done(result);
                } else {
                  return res.status(201).json("modification error");
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          },
        ],
        function (result) {
          req.recherche = statut;
          next();
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  ReadProcess: (req, res) => {
    try {
      const recherche = req.recherche;
      let match = recherche ? { idProcess: recherche } : {};

      asyncLab.waterfall([
        function (done) {
          modelProcess
            .find(match)
            .then((result) => {
              if (result.length > 0) {
                let data = recherche ? result[0] : result.reverse();
                return res.status(200).json(data);
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
};
