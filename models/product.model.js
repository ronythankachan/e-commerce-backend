const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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
    tags: [String],
    variations: [String],
    images: {
      type: [String],
      required: true,
    },
    extraInfo: [
      {
        key: String,
        value: String,
      },
    ],
    rating: {
      type: Number,
      required: true,
    },
    publish: {
      type: Boolean,
      required: true,
    },
    new: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

/*
Each product will have a 

1. Product title
2. Description
3. Images
4. Tags
5. Categories
6. Price - price will have currency and its value
7. Extra info as key value pairs
8. publish on site
9. Discount 


// Form -details

1. Product title => Text form (label = Product Title, placeholder = Type here)
2. Description => Text area (label= Description, Placeholder = Type here)
3. Images => (label = Images, Total 4 images of square size, Cloud upload icon when not uploaded, if uploaded delete button on hover)
4. Tags => (label =Tags, Type and add)
5. Categories => (label =Categories, Tagged with search through categories)
6. Price => (label=Price, 2 input fields, one is to select currency and other to type the amnount)
7. Extra info (label= Additional information, one input field for key(placeholder =Key) and another input field for value(placeholder=Value) with a plus button to add more)
8. Discount => (label=Discount in %, placeholder=Type here, type=number)
9. Publish on site => (Checkbox to publish on site)
10. Save button to save product.
*/
