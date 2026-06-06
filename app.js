const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const authRouter = require("./routes/v1/auth");
const userRouter = require("./routes/v1/user");
const categoryRouter = require("./routes/v1/category");
const courseRouter = require("./routes/v1/course");

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
app.use("/v1/category", categoryRouter);
app.use("/v1/course", courseRouter);

module.exports = app;
