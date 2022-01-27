const Brand = require("../models/brand.model");
const addBrand = async (req, res) => {
  const result = new Brand(req.body).save().catch((err) => {
    return res.status(500).send({ message: "Failed to add brand", err: err });
  });
  res.send("Brand added successfully");
};

const deleteBrand = async (req, res) => {
  const result = Brand.findByIdAndDelete(req.params.id).catch((err) => {
    return res
      .status(500)
      .send({ message: "Unable to delete brand", err: err });
  });
  res.send({ message: "Brand removed successfully" });
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

module.exports = {
  addBrand,
  deleteBrand,
  getBrands,
};
