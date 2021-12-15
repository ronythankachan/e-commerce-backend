const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");

router.post("/save", [authorize, isAdmin], productControllers.addProduct);
module.exports = router;
