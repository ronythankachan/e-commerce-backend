const mongoose = require("mongoose");
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

const getReviewByProductId = async (req, res) => {
  try {
    const agg = [
      {
        $match: {
          product: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          user: {
            $arrayElemAt: ["$user", 0],
          },
        },
      },
      {
        $project: {
          _id: 1,
          product: 1,
          rating: 1,
          review: 1,
          "user.email": 1,
          "user._id": 1,
          updatedAt: 1,
        },
      },
    ];
    const result = await Review.aggregate(agg);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Failed to fetch reviews",
    });
  }
};

const getAvgRatingAndTotalReviews = async (req, res) => {
  const avgRatingAgg = [
    {
      $match: {
        product: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $group: {
        _id: "$_id",
        rating: {
          $avg: "$rating",
        },
      },
    },
  ];
  const reviewCountAgg = [
    {
      $match: {
        product: mongoose.Types.ObjectId(req.params.id),
        review: {
          $ne: "",
        },
      },
    },
    {
      $count: "reviews",
    },
  ];
  try {
    const avgRating = await Review.aggregate(avgRatingAgg);
    const reviewCount = await Review.aggregate(reviewCountAgg);
    res.send({ ...avgRating[0], ...reviewCount[0] });
  } catch (err) {
    res.status(500).send({
      message: "Failed to get average rating and no.of reviews",
    });
  }
};

module.exports = {
  addReview,
  deleteReview,
  getReviewByProductId,
  getAvgRatingAndTotalReviews,
};
