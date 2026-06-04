const jwt = require("jsonwebtoken");
const userModel = require("./../models/user");

const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        msg: "برای دسترسی به این بخش، لطفا ابتدا وارد حساب کاربری خود شوید.",
      });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await userModel.findOne({ _id: verifyToken?.id });

    if (userData) {
      req.user = userData;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message:
          "توکن نامعتبر است یا منقضی شده است. لطفا مجددا وارد حساب کاربری خود شوید.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "توکن نامعتبر است یا منقضی شده است. لطفا مجددا وارد حساب کاربری خود شوید.",
    });
  }
};

module.exports = authUser;
