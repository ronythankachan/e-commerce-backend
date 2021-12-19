const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");
const { uploadProductImages } = require("../middlewares/product.middlewares");

router.post("/save", uploadProductImages, productControllers.saveProduct);
router.post("/delete", productControllers.deleteProduct);

module.exports = router;
