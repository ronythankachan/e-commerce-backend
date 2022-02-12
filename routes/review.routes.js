const express = require("express");
const router = express.Router();
const reviewControllers = require("../controllers/review.controllers");
const { authorize } = require("../middlewares/auth.middlewares");

router.post("/add", [authorize], reviewControllers.addReview);
router.get("/:id", reviewControllers.getReviewByProductId);
router.delete("/:id", [authorize], reviewControllers.deleteReview);
module.exports = router;
