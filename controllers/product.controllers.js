const fs = require("fs");
const util = require("util");
const { uploadFile } = require("../helpers/aws-s3.helper");
const Product = require("../models/product.model");

const unlinkFile = util.promisify(fs.unlink);

// Upload image to aws s3 server and return url
const uploadToAws = async (req, res) => {
  if (req.imageCheck) return res.status(500).send({ message: req.imageCheck });
  const image = req.file;
  if (!image) return res.status(400).send({ message: "Image field missing" });
  try {
    const result = await uploadFile(image);
    res.send({ url: result.Location });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Image upload failed", err: err.message });
  } finally {
    await unlinkFile("uploads/" + image.originalname);
  }
};

// Add a new product
const saveProduct = async (req, res) => {
  const product = req.body;
  try {
    if (req.body._id) await Product.findByIdAndUpdate(product._id, req.body);
    else await Product.create(req.body);
    res.send({ message: "Product Saved successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to add product", err: err.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
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
  uploadToAws,
  saveProduct,
  deleteProduct,
  getProducts,
};
