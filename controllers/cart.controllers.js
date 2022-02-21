const Cart = require("../models/cart.model");

// This function can be
const changeCart = async (req, res) => {
  try {
    if (!req.body._id) {
      const result = await Cart.create(req.body);
      res.send(result);
    } else {
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
    res.status(500).send({ message: "Failed to update cart" });
  }
};

module.exports = { changeCart };
