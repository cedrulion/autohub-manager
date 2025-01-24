const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  title: String,
  summary: String,
  details: String,
  submissionDate: { type: Date, default: Date.now },
});

const AnnouncementModel = mongoose.model("announcement", AnnouncementSchema);

module.exports = AnnouncementModel;
