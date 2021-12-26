const fs = require("fs");
const util = require("util");
const { uploadFile } = require("../helpers/aws-s3.helper");
const Product = require("../models/product.model");

const unlinkFile = util.promisify(fs.unlink);
// Add or update product information
const saveProduct = async (req, res) => {
  const imageURLs = [];
  const images = req.files.images;
  for (let image of images) {
    try {
      const result = await uploadFile(image);
      imageURLs.push(result.Location);
    } catch (err) {
      return res.status(500).send({
        message: "Uploading images to amazon s3 failed",
        err: err,
      });
    } finally {
      await unlinkFile("uploads/productimages/" + file.originalname);
    }
  }
  const data = JSON.parse(JSON.stringify(req.body));
  const product = JSON.parse(JSON.parse(data.data));
  product.images = imageURLs;
  const productResult = await new Product(product).save();
  if (productResult)
    res.send({
      message: "Product information saved successfully",
      result: productResult,
    });
  else res.status(500).send({ message: "Somthing went wrong" });
};
const deleteProduct = (req, res) => {};

module.exports = {
  saveProduct,
  deleteProduct,
};
