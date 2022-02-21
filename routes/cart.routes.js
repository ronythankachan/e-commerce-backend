const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cart.controllers");
const { authorize } = require("../middlewares/auth.middlewares");

router.post("/change", [authorize], cartControllers.changeCart);
router.get("/:id", [authorize], cartControllers.getCartByUserId);
module.exports = router;
