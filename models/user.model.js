const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    match: [/^[a-zA-Z ]+$/, "name should only contain letters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Invalid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
      "Password should atleast contain 8 characters including one uppercase letter, one special character and a number",
    ],
  },
  phone: {
    type: String,
    required: true,
    match: [/^[789]\d{9}$/, "Invalid phone number"],
  },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
