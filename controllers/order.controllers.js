const Order = require("../models/order.model");

const getAllOrders = async (req, res) => {
  var filters = {};
  if (req.params.status) filters.status = req.params.status;
  try {
    const result = await Order.find(filters);
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to get orders" });
  }
};

const changeOrderStatus = async (req, res) => {
  if (!req.body.status || !req.body.id)
    return res.status(400).send({ message: "Invalid input fields" });
  try {
    await Order.findByIdAndUpdate(req.body.id, req.body.status);
    res.send({ message: `Order status changed to ${req.body.status}` });
  } catch (err) {
    res.status(500).send({ message: "Failed to change status" });
  }
};

const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const result = await order.create();
    res.send({
      message: `Order placed successfully with order id : ${result._id}`,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to place order. Try again later." });
  }
};

module.exports = {
  getAllOrders,
  changeOrderStatus,
  addOrder,
};
