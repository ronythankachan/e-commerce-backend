const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
    enum: ["user", "admin"],
  })
);

module.exports = Role;
