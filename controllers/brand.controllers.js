const Brand = require("../models/brand.model");
const addBrand = async (req, res) => {
  try {
    await new Brand(req.body).save();
    res.send("Brand added successfully");
  } catch (err) {
    res.status(500).send({ message: "Failed to add brand" });
  }
};

const deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.send("Brand deleted successfully");
  } catch (err) {
    res.status(500).send({ message: "Failed to delete brand" });
  }
};

const getBrands = async (req, res) => {
  try {
    const result = await Brand.find();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: "Failed to fetch brands",
    });
  }
};

const getBrandById = async (req, res) => {
  try {
    const result = await Brand.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: "Failed to fetch brands",
    });
  }
};

module.exports = {
  addBrand,
  deleteBrand,
  getBrands,
  getBrandById,
};
