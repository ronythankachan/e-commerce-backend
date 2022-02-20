const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cart.controllers");
const { authorize } = require("../middlewares/auth.middlewares");

router.post("/add", [authorize], cartControllers.addToCart);
// router.get("/", brandControllers.getBrands);
// router.get("/:id", brandControllers.getBrandById);
// router.delete("/:id", [authorize, isAdmin], brandControllers.deleteBrand);
module.exports = router;
