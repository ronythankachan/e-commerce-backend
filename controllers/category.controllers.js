const Category = require("../models/category.model");

const addCategory = async (req, res) => {
  try {
    await new Category({ name: req.body.name }).save();
    res.send({ message: "Category added successfully" });
  } catch (err) {
    res.status(500).send({ message: "Failed to add category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.send({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Failed to delete category" });
  }
};

const getCategories = async (req, res) => {
  try {
    const result = await Category.find();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: "Failed to fetch categories",
    });
  }
};

module.exports = {
  addCategory,
  deleteCategory,
  getCategories,
};
