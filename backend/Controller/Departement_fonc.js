const Role = require("../Model/Tracker/Role");

module.exports = {
  CreateLink: (req, res) => {
    try {
      const { link, fonction } = req.body;
      if (!link || !fonction) {
        return res.status(201).json("Veuillez renseigner les champs");
      }
      Role.findByIdAndUpdate(fonction, { $set: { link } }, { new: true })
        .then((result) => {
          if (result) {
            return res.status(200).json(result);
          } else {
          }
        })
        .catch(function (err) {
          return res.status(201).json("Error " + err);
        });
    } catch (error) {
      console.log(error);
    }
  },
};
