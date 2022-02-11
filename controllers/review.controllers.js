const Review = require("../models/review.model");
const addReview = async (req, res) => {
  try {
    await new Review(req.body).save();
    res.send("Review added successfully");
  } catch (err) {
    res.status(500).send({ message: "Failed to add review" });
  }
};

const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.send("Review deleted successfully");
  } catch (err) {
    res.status(500).send({ message: "Failed to delete review" });
  }
};

const getReviewById = async (req, res) => {
  try {
    const result = await Review.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: "Failed to fetch reviews",
    });
  }
};

module.exports = {
  addReview,
  deleteReview,
  getReviewById,
};
