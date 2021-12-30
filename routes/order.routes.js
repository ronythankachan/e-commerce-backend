const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order.controllers");

router.get("/", [authorize, isAdmin], orderControllers.getAllOrders);

module.exports = router;
