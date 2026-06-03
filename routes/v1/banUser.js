const express = require("express");
const banUserController = require("./../../controllers/v1/banUser");

const router = express.Router();

router.route("/:id").post(banUserController.banUser);

module.exports = router;
