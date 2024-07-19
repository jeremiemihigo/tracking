const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, uppercase: true },
    id: { type: String, required: true, unique: true },
    savedBy: { type: String, required: true },
    members: { type: Array, required: false, default: [] },
    color: { type: String, required: true, default: "#fff" },
    link: { type: String, required: false },
  },
  { timestamps: true }
);
schema.index({ id: 1 });
const model = mongoose.model("Role", schema);
module.exports = model;
