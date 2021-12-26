const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");
const { uploadProductImages } = require("../middlewares/product.middlewares");

router.post(
  "/save",
  [authorize, isAdmin, uploadProductImages],
  productControllers.saveProduct
);
router.delete(
  "/delete",
  [authorize, isAdmin],
  productControllers.deleteProduct
);
router.get(
  "/get-products",
  [authorize, isAdmin],
  productControllers.getProducts
);

module.exports = router;
