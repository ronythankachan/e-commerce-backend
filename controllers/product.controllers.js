const fs = require("fs");
const util = require("util");
const { uploadFile } = require("../helpers/aws-s3.helper");
const Product = require("../models/product.model");

const unlinkFile = util.promisify(fs.unlink);
// Add or update product information
const saveProduct = async (req, res) => {
  const imageURLs = [];
  const images = req.files;
  if (images.length === 0)
    return res.status(400).send({ message: "images field is required" });
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
  const data = JSON.parse(JSON.parse(req.body.data));
  console.log(data);
  data.images = imageURLs;
  var product = new Product();
  try {
    await product.init(data, {});
    await product.save();
    res.send({ message: "Product saved successfully" });
  } catch (err) {
    res.status(500).send({ message: "Failed to save product", err: err });
  }
};
// Delete a product
const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.body._id });
    res.send({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Failed to delete product", err: err });
  }
};
// Get all products
const getProducts = async (req, res) => {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to get products" });
  }
};

module.exports = {
  saveProduct,
  deleteProduct,
  getProducts,
};

const data = {
  title: "Nike jordan",
  description: "Nike jordan description",
  price: {
    currency: "inr",
    value: 4000,
  },
  categories: ["61c83ad83583ea78a59f8b49"],
  tags: [],
  publish: true,
};
