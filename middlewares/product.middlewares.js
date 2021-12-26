const multer = require("multer");
const fs = require("fs");

const productImageStore = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("./uploads/productimages/"))
      fs.mkdirSync("./uploads/productimages/", { recursive: true });
    cb(null, "./uploads/productimages/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    const types = ["image/png", "image/jpg", "image/jpeg"];
    if (types.includes(file.mimetype)) cb(null, true);
    else cb(null, false);
  },
});

// middleware to upload product images local directory
const uploadProductImages = (req, res, next) => {
  const upload = multer({ storage: productImageStore }).array("images", 4);
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err);
    } else if (err)
      return res
        .status(500)
        .send({ message: "Something went wrong", err: err });
    next();
  });
};
module.exports = {
  uploadProductImages,
};
