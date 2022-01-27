const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/category.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");

router.post("/add", [authorize, isAdmin], categoryControllers.addCategory);
router.get("/", [authorize, isAdmin], categoryControllers.getCategories);
router.delete("/:id", [authorize, isAdmin], categoryControllers.deleteCategory);
module.exports = router;
