const mongoose = require("mongoose");
const Role = require("./models/role.model");

module.exports = () => {
  const connection_url = process.env.MONGO_URI;
  mongoose
    .connect(connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      addRoles();
    })
    .catch((err) => {
      console.log("Connection error", err);
    });
};

const addRoles = () => {
  const roles = ["admin", "user"];
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      roles.forEach((role) => {
        new Role({
          name: role,
        }).save((err) => {
          if (err) console.log(`Error in ${role} role`);
          console.log(`${role} role addedd successfully`);
        });
      });
    }
  });
};
