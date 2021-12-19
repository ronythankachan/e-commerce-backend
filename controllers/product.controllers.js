const fs = require("fs");
const util = require("util");
const { uploadFile } = require("../helpers/aws-s3.helper");
const Product = require("../models/product.model");

const unlinkFile = util.promisify(fs.unlink);
// Add or update product information
const saveProduct = async (req, res) => {
  const thumnail = req.files.thumbnail[0];
  var thumbnailURL = "";
  const imageURLs = [];
  const result = await uploadFile(thumnail)
    .catch((err) => {
      return res
        .status(500)
        .send({ message: "Uploading thumbnail to amazon s3 failed", err: err });
    })
    .finally(async () => {
      await unlinkFile("uploads/productimages/" + thumnail.originalname);
    });
  thumbnailURL = result.Location;
  for (const file of req.files.images) {
    const result = await uploadFile(file)
      .catch((err) => {
        return res.status(500).send({
          message: "Uploading images to amazon s3 failed",
          err: err,
        });
      })
      .finally(async () => {
        await unlinkFile("uploads/productimages/" + file.originalname);
      });
    imageURLs.push(result.Location);
  }
  // upload other data to mongodb
  const product = JSON.parse(JSON.stringify(req.body));
  product.thumbnail = thumbnailURL;
  product.images = imageURLs;
  console.log(product);
  result = await new Product(product).save();
  res.send(result);
};
const deleteProduct = (req, res) => {};

module.exports = {
  saveProduct,
  deleteProduct,
};
