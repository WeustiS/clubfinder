const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventSchema = new Schema({
  eventClubName: { type: String, default: "Test" },
  eventName: String,
  eventDesc: String,
  eventDate: String,
  eventNotify: Boolean
});

const eventModel = mongoose.model("Event", eventSchema);

module.exports = eventModel;
