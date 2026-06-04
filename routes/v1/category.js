const express = require("express");
const categoryController = require("../../controllers/v1/category");
const authMiddlewares = require("../../middlewares/auth");
const isAdminMiddlewares = require("../../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .get(categoryController.get)
  .post(authMiddlewares, isAdminMiddlewares, categoryController.create);
router
  .route("/:id")
  .delete(authMiddlewares, isAdminMiddlewares, categoryController.delete);

module.exports = router;
