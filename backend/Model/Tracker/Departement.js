const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    idDepartement: { type: String, required: true },
    departement: { type: String, required: true, trim: true, uppercase: true },
  },
  { timestamps: true }
);
const model = mongoose.model("departement", schema);
module.exports = model;
