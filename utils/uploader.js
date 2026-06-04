const path = require("path");
const multer = require("multer");

exports.uploader = async () =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../", "public", "courses", "cover"));
    },
    filename: (req, file, cb) => {
      const filename = Date.now() + String(Math.random() * 9999);
      const ext = path.extname(file.originalname);
      cb(null, filename + ext);
    },
  });
