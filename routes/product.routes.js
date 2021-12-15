const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");

router.post("/save", [authorize, isAdmin], productControllers.saveProduct);
router.post("/delete", [authorize, isAdmin], productControllers.deleteProduct);

module.exports = router;
