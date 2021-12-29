const express = require("express");
const multer = require("multer");
const router = express.Router();
const productControllers = require("../controllers/product.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");
const { uploadToLocal } = require("../middlewares/product.middlewares");

router.post(
  "/upload",
  [authorize, isAdmin, uploadToLocal.single("image")],
  productControllers.uploadToAws
);
router.post("/save", [authorize, isAdmin], productControllers.saveProduct);
router.delete("/:id", [authorize, isAdmin], productControllers.deleteProduct);
router.get(
  "/get-products",
  [authorize, isAdmin],
  productControllers.getProducts
);

module.exports = router;
