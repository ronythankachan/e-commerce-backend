const Cart = require("../models/cart.model");
const addToCart = async (req, res) => {
  try {
    if (!req.body._id) {
      const result = await Cart.create(req.body);
      res.send(result);
    } else {
      console.log(req.body._id);
      console.log(req.body.products);
      const updatedResult = await Cart.findByIdAndUpdate(
        req.body._id,
        {
          $set: { products: req.body.products },
        },
        { new: true }
      );
      res.send(updatedResult);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to update cart" });
  }
};
module.exports = { addToCart };
