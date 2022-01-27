const Category = require("../models/category.model");
const addCategory = async (req, res) => {
  const result = new Category({ name: req.body.name }).save().catch((err) => {
    return res
      .status(500)
      .send({ message: "Failed to add category", err: err });
  });
  res.send("Category added successfully");
};

const deleteCategory = async (req, res) => {
  const result = Category.deleteOne({ _id: req.body._id }).catch((err) => {
    return res
      .status(500)
      .send({ message: "Unable to delete category", err: err });
  });
  res.send({ message: "Category removed successfully" });
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
