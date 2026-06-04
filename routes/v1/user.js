const express = require("express");
const banUserController = require("./../../controllers/v1/user");
const authMiddlewares = require("../../middlewares/auth");
const isAdminMiddlewares = require("../../middlewares/isAdmin");

const router = express.Router();

router
  .route("/ban-user/:id")
  .post(authMiddlewares, isAdminMiddlewares, banUserController.banUser);
router
  .route("/")
  .get(authMiddlewares, isAdminMiddlewares, banUserController.allUsers);

router
  .route("/:id")
  .delete(authMiddlewares, isAdminMiddlewares, banUserController.deleteUser);

module.exports = router;
