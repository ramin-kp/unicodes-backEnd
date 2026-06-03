const express = require("express");
const userController = require("../../controllers/v1/auth");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/getMe", userController.getMe);

module.exports = router;
