const mongoose = require("mongoose");

const { Schema } = mongoose;

// create a schema
const userSchema = new Schema({
  userName: String,
  userClubs: [String], // Is this a thing?
  userAccountCreated: Date
});
const eventSchmea = new Schema({
  eventName: String,
  eventDate: Date,
  eventDesc: String,
  eventNotify: Boolean
});

const clubSchema = new Schema({
  // name: String,
  // desc: String

  clubName: String,
  clubDesc: String,
  clubDues: Number,
  clubPics: String,
  clubDate: Date
  // clubEvents: [eventSchmea],
  // clubMembers: [userSchema]

  //  clubFinances: incomes, outcomes. Each expenditure/revenue is an object?
  //  clubAttendence: list of meetings and who attended
  //  clubRemind: check remind API
});

// create the model
const clubModel = mongoose.model("Club", clubSchema);

// export the model
module.exports = clubModel;
