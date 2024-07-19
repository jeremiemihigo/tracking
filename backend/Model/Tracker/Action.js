const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    idStatus: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

const model = mongoose.model("Action", schema);
module.exports = model;
