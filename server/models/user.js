const mongoose = require("mongoose");

const { Schema } = mongoose;

// create a schema
const userSchema = new Schema({
  userName: String,
  userClubs: [String], // Is this a thing?
  userAccountCreated: { type: String, default: Date.now() }
});
// create the model
const userModel = mongoose.model("User", userSchema);
// export the model
module.exports = userModel;
