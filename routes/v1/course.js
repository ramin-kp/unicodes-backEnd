const express = require("express");
const multer = require("multer");

const authMiddlewares = require("../../middlewares/auth");
const isAdminMiddlewares = require("../../middlewares/isAdmin");
const courseController = require("../../controllers/v1/course");

const multerStorage = require("./../../utils/uploader");

const router = express.Router();

router
  .route("/")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 100000000 } }).single(
      "cover",
    ),
    authMiddlewares,
    isAdminMiddlewares,
    courseController.create,
  );

module.exports = router;
