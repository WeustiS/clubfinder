const mongoose = require("mongoose");

const { Schema } = mongoose;

// create a schema
const userSchema = new Schema({
  userFirstName: String,
  userLastName: String,
  userEmail: String,
  userPassword: String,
  userClubs: { type: [String], default: [] },
  userAccountCreated: { type: Date, default: Date.now() }
});
// create the model
const userModel = mongoose.model("User", userSchema);
// export the model
module.exports = userModel;
