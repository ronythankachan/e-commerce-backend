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
});
/*
    Each product will have
    1. name
    2. description
    3. price
    4. stock
    5. offers
    6. categories
    7. images
    8. additional information
    9. discount
*/
