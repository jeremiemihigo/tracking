const modelAction = require("../Model/Tracker/Action");
const modelStatusLabel = require("../Model/Tracker/StatutLabel");
const asyncLab = require("async");
const { generateString } = require("../Static/fonction");

module.exports = {
  AddAction: (req, res) => {
    try {
      const { idStatus, title } = req.body;

      if (!idStatus || !title) {
        return res.status(404).json("Please fill in the fields");
      }
      asyncLab.waterfall(
        [
          function (done) {
            modelAction
              .findOne({ idStatus, title })
              .then((conforme) => {
                if (conforme) {
                  return res.status(404).json("This action already exists");
                } else {
                  done(null, conforme);
                }
              })
              .catch(function (err) {
                return res.status(404).json("Erreur");
              });
          },
          function (result, done) {
            modelAction
              .create({
                idStatus,
                title,
              })
              .then((response) => {
                done(response);
              })
              .catch(function (err) {
                console.log(err);
                return res.status(404).json("Erreur");
              });
          },
        ],
        function (result) {
          if (result) {
            return res.status(200).json(result);
          } else {
            return res.status(404).json("Registration error");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  AddStatut: (req, res) => {
    try {
      const { idStatus, title } = req.body;
      const { codeAgent } = req.user;
      if (!idAction || !title) {
        return res.status(201).json("Please fill in the fields");
      }
      asyncLab.waterfall(
        [
          function (done) {
            modelStatusLabel
              .findOne({ idStatus, title })
              .then((exist) => {
                if (exist) {
                  return res.status(201).json("This Label already exists");
                } else {
                  done(null, exist);
                }
              })
              .catch(function (err) {
                return res.status(201).json("Registration error");
              });
          },
          function (exis, done) {
            modelStatusLabel
              .create({
                title,
                idStatus,
                savedBy: codeAgent,
                idLabel: generateString(5),
              })

              .then((action) => {
                done(action);
              })
              .catch(function (err) {
                return res.status(201).json("Registration error");
              });
          },
        ],
        function (result) {
          if (result) {
            return res.status(200).json(result);
          } else {
            return res.status(201).json("Registration error");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  EditAction: (req, res, next) => {
    try {
      const { title, statut, idStatus, id } = req.body;
      if (!title || !statut || !idStatus || !id) {
        return res.status(404).json("Veuillez renseigner les champs");
      }
      modelAction
        .findByIdAndUpdate(id, { $set: { title, idStatus } })
        .then((result) => {
          req.recherche = statut;
          next();
        })
        .catch(function (err) {
          return res.status(404).json("Error " + err);
        });
    } catch (error) {
      console.log(error);
    }
  },
  DeleteAction: (req, res, next) => {
    try {
      const { idAction, statut } = req.body;
      if (!idAction || !statut) {
        return res.status(404).json("Veuillez renseigner les champs");
      }
      modelAction.findByIdAndDelete(idAction).then((result) => {
        req.recherche = statut;
        next();
      });
    } catch (error) {
      console.log(error);
    }
  },
};
