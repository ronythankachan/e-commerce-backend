const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema(
    {
      name: String,
      enum: ["user", "admin"],
    },
    { timestamps: true }
  )
);

module.exports = Role;
