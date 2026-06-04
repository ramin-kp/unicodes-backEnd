const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const authRouter = require("./routes/v1/auth");
const userRouter = require("./routes/v1/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  "/courses/cover",
  express.static(path.join(__dirname, "public", "courses", "cover")),
);

app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);

module.exports = app;
