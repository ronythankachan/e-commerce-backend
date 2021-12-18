const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const productControllers = require("../controllers/product.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    const types = ["image/png", "image/jpg", "image/jpeg"];
    if (types.includes(file.mimetype)) cb(null, true);
    else cb(null, false);
  },
  onError: (err,next)=>{
      next(err)
  }
});

const upload = multer({ storage: storage });

router.post(
  "/save",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 4 },
  ]),
  productControllers.saveProduct
);
router.post("/delete", productControllers.deleteProduct);

module.exports = router;
