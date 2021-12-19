const fs = require("fs");
const util = require("util");
const { uploadFile } = require("../helpers/aws-s3.helper");

const unlinkFile = util.promisify(fs.unlink);
const saveProduct = async (req, res) => {
  console.log(req.files.thumbnail[0]);
  console.log(JSON.stringify(req.body));
  await uploadFile(req.files.thumbnail[0]).then(async () => {
    await unlinkFile(
      "uploads/productimages/" + req.files.thumbnail[0].originalname
    );
  });
  for (const file of req.files.images) {
    await uploadFile(file).then(async () => {
      await unlinkFile("uploads/productimages/" + file.originalname);
    });
  }
  res.send("testing");
};
const deleteProduct = (req, res) => {};

module.exports = {
  saveProduct,
  deleteProduct,
};
