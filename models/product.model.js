const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    currency: {
      type: String,
      enum: ["inr", "usd"],
      default: "inr",
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  stock: {
    type: Number,
    min: 0,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  ],
  thumbnail: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  extraInfo: [
    {
      key: String,
      value: String,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
/*
    Each product will have
    1. name
    2. description
    3. price
    4. stock
    5. discount
    6. categories
    7. images
    8. additional information
*/
