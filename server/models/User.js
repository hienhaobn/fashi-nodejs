var mongoose = require("mongoose");
const User = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  dob: Date,
  image_avatar: String,
  email: String,
  phone: String,
  address: String,
  status: Boolean,
  role: Number,
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: Date
});

module.exports = mongoose.model("User", User);
