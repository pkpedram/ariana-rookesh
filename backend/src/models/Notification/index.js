const mongoose = require("mongoose");

const model = {
  text: String,
  type: String,
  link: String,
  public: { type: Boolean, default: false },
  created_date: { type: Date, default: new Date() },
};

const notificationSchema = new mongoose.Schema(model);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;

// TYPES are success, info and error
