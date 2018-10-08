const mongoose = require("mongoose");

const { Schema } = mongoose;

const clubSchema = new Schema({
  clubName: String,
  clubDesc: String,
  clubDues: Number,
  clubPics: String,
  clubDate: String
  //   clubEvents: [eventSchmea],
  // clubMembers: [userSchema]

  //  clubFinances: incomes, outcomes. Each expenditure/revenue is an object?
  //  clubAttendence: list of meetings and who attended
  //  clubRemind: check remind API
});

// create the model
const clubModel = mongoose.model("Club", clubSchema);

// export the model
module.exports = clubModel;
