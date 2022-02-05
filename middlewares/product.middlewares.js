const multer = require("multer");
const DIR = "./uploads";
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// multer middleware to upload a file to local
var uploadToLocal = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (fileTypes.includes(file.mimetype)) cb(null, true);
    else {
      req.imageCheck = "Only .jpg, .png and .jpeg format allowed!";
      return cb(
        null,
        false,
        new Error("Only .jpg, .png and .jpeg format allowed!")
      );
    }
  },
});

module.exports = {
  uploadToLocal,
};
