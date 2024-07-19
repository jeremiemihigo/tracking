const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    idProcess: { type: String, required: true },
    savedBy: { type: String, required: true },
  },
  { timestamps: true }
);

schema.index({ idProcess: 1 });
const model = mongoose.model("Process", schema);
module.exports = model;
