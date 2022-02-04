const express = require("express");
const router = express.Router();
const brandControllers = require("../controllers/brand.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");

router.post("/add", [authorize, isAdmin], brandControllers.addBrand);
router.get("/", brandControllers.getBrands);
router.delete("/:id", [authorize, isAdmin], brandControllers.deleteBrand);
module.exports = router;
