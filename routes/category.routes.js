const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/category.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");

router.post("/add", [authorize, isAdmin], categoryControllers.addCategory);
router.delete(
  "/delete",
  [authorize, isAdmin],
  categoryControllers.deleteCategory
);
module.exports = router;
