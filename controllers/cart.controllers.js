const Cart = require("../models/cart.model");
const addToCart = async (req, res) => {
  try {
    const cart = await new Cart(req.body).save();
    res.send(cart);
  } catch (err) {
    res.status(500).send({ message: "Failed to update cart" });
  }
};
module.exports = { addToCart };
