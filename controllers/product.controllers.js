const fs = require("fs");
const util = require("util");
const { uploadFile } = require("../helpers/aws-s3.helper");
const Product = require("../models/product.model");

const unlinkFile = util.promisify(fs.unlink);
// Add or update product information
const saveProduct = async (req, res) => {
  const imageURLs = [];
  const images = req.files;
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
      await unlinkFile("uploads/productimages/" + image.originalname);
    }
  }
  const product = JSON.parse(JSON.parse(req.body.data));
  console.log(product);
  product.images = imageURLs;
  try {
    const productResult = await new Product(product).save();
    res.send({
      message: "Product information saved successfully",
      result: productResult,
    });
  } catch (err) {
    res.status(500).send({ message: "Somthing went wrong" });
  }
};

const deleteProduct = (req, res) => {};

module.exports = {
  saveProduct,
  deleteProduct,
};

const data = {
  title: "Nike jordan",
  description: "Nike jordan description",
  price: {
    currency: "inr",
    value: 4000,
  },
  discount: 0,
  categories: ["61c83ad83583ea78a59f8b49"],
  tags: [],
  extraInfo: [],
  publish: true,
};
