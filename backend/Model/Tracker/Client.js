const mongoose = require("mongoose");

const label = new mongoose.Schema(
  {
    feedbackSelect: { type: String, required: true, trim: true },
    dateDebut: { type: Date, required: true, trim: true },
    delaiPrevu: { type: Number, required: true },
    dateFin: { type: Date, required: true, trim: true },
    commentaire: { type: String, required: false, trim: true },
    status: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    codeAgent: { type: String, required: true },
    idAction: { type: String, required: true },
    heureUpdated: { type: String, required: true },
  },
  { timestamps: true }
);
const toDay = new Date();
const periode = `${
  toDay.getMonth() + 1 < 10
    ? "0" + (toDay.getMonth() + 1)
    : toDay.getMonth() + 1
}-${toDay.getFullYear()}`;

const UserSchema = new mongoose.Schema({
  unique_account_id: {
    type: String,
    required: true,
    max: 12,
    min: 12,
    trim: true,
    uppercase: true,
  },
  month: { type: String, required: true, default: periode },
  // Destination: { type: String, required: false, default: "" },
  // typeFeedback: { type: String, required: false },
  // feedbackSelect: { type: String, required: false },
  codeAgent: { type: String, required: false },
  customer_name: { type: String, required: false, trim: true },
  // enable_status: { type: String, required: false, trim: true },
  date_timestamp: {
    type: String,
    required: false,
    trim: true,
    uppercase: true,
  },
  expiry_timestamp: { type: String, required: false, trim: true },

  shop_region: {
    type: String,
    required: false,
    enum: [
      "South Kivu",
      "North Kivu",
      "Katanga",
      "Tshopo",
      "Ituri",
      "Kinshasa",
    ],
  },
  shop_name: {
    type: String,
    required: true,
    enum: [
      "Walungu",
      "Bunia Shop",
      "Beni",
      "Kavumu",
      "Uvira",
      "Baraka",
      "Kalemie",
      "Luvungi",
      "Kisangani Shop",
      "Goma",
      "Butembo",
      "Minova",
      "Rubaya",
      "Kinshasa Ngaliema",
      "Kinshasa Tshangu",
      "Kolwezi",
      "Lubumbashi",
      "Ariwara",
      "Bukavu Shop",
      "Durba",
    ],
  },
  par_to_date: { type: String, required: false },
  beginStatus: { type: String, required: true },
  statusEnCours: { type: String, required: false },
  visited: { type: String, required: false, enum: ["nVisited", "visited"] },
  called: { type: String, required: false, enum: ["called", "nCalled"] },
  objectVisite: {
    codeAgent: String,
    idDemande: String,
    raison: String,
    dateSave: Date,
  },
  result: { type: [label], required: false },
  active: { type: Boolean, default: true, required: true },
  updatedAt: { type: Date, required: true },
  provenance: {
    codeAgent: String,
    commentaire: String,
    role: String,
  },
  // person_in_charge: { type: String, required: true },
});
UserSchema.index({ unique_account_id: 1, active: 1 }, { unique: true });
UserSchema.index({ visited: 1 });
UserSchema.index({ actionEnCours: 1 });
UserSchema.index({ shop_name: 1 });
UserSchema.index({ shop_region: 1 });
UserSchema.index({ person_in_charge: 1 });

const model = mongoose.model("Client", UserSchema);
module.exports = model;
