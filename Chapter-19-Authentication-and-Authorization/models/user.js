const mongoose = require("mongoose");
// const FavoriteSchema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },

  userType: {
    type: String,
    enum: ["guest", "host"],
    default: "guest",
  },
});

module.exports = mongoose.model("User", userSchema);
