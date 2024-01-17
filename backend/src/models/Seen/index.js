const mongoose = require("mongoose");

const model = {
  created_date: { type: Date, default: new Date() },
};

const statsSchema = new mongoose.Schema(model);

const Seen = mongoose.model("Seen", statsSchema);

module.exports = Seen;
