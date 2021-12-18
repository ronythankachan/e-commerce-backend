const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");
const { imageUpload } = require("../middlewares/product.middlewares");

router.post("/save", [imageUpload], productControllers.saveProduct);
router.post("/delete", productControllers.deleteProduct);

module.exports = router;
