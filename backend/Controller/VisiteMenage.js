const modelClient = require("../Model/Tracker/Client");

module.exports = {
  pushClientVisite: (req, res) => {
    try {
      const { data } = req.body;
      if (data && data.length === 0) {
        return res.status(201).json("Data not found");
      }
      for (let i = 0; i < data.length; i++) {
        const dates = new Date().toISOString();
        modelClient
          .findOneAndUpdate(
            {
              unique_account_id: data[i].codeclient,
              active: true,
              month: data[i].periode,
            },
            {
              $set: {
                objectVisite: {
                  codeAgent: data[i].codeAgent,
                  idDemande: data[i].idDemande,
                  raison: data[i].raison,
                  dateSave: data[i].dateSave,
                },
                visited: "visited",
                statusEnCours: "SA89AF",
                updatedAt: dates.split("T")[0],
              },
            },
            { new: true }
          )
          .then((result) => {
            if (i + 1 === data.length) {
              return res.status(200).json("operation carried out");
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
