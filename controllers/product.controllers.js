const fs = require("fs");
const util = require("util");
const { uploadFile } = require("../helpers/aws-s3.helper");

const unlinkFile = util.promisify(fs.unlink);
// Add or update product information
const saveProduct = async (req, res) => {
  const thumnail = req.files.thumbnail[0];
  await uploadFile(thumnail)
    .catch((err) => {
      return res
        .status(500)
        .send({ message: "Uploading thumbnail to amazon s3 failed", err: err });
    })
    .finally(async () => {
      await unlinkFile("uploads/productimages/" + thumnail.originalname);
    });
  for (const file of req.files.images) {
    await uploadFile(file)
      .catch((err) => {
        return res.status(500).send({
          message: "Uploading thumbnail to amazon s3 failed",
          err: err,
        });
      })
      .finally(async () => {
        await unlinkFile("uploads/productimages/" + file.originalname);
      });
  }
  res.send({ message: "Product data saved successfully" });
};
const deleteProduct = (req, res) => {};

module.exports = {
  saveProduct,
  deleteProduct,
};
