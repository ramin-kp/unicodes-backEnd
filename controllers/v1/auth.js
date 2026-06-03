const userModel = require("../../models/user");
const validator = require("../../validators/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const registerValidatorResult = validator(req.body);

    if (registerValidatorResult !== true) {
      return res.status(429).json({
        msg: "فیلدهای ارسالی معتبر نمی باشد",
        validatorMsg: registerValidatorResult,
      });
    }
    const { username, firesName, lastName, mobile, email, password } = req.body;

    const isExistUser = await userModel.findOne({
      $or: [{ username }, { email }, { mobile }],
    });

    if (isExistUser) {
      return res.status(409).json({
        msg: "ایمیل یا شماره موبایل یا نام کاربری قبلا استفاده شده است",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const userCount = await userModel.find();
    const addUser = await userModel.create({
      username,
      firesName,
      lastName,
      mobile,
      email,
      password: hashedPass,
      role: userCount > 0 ? "USER" : "ADMIN",
    });

    const userObject = addUser.toObject();
    Reflect.deleteProperty(userObject, "password");

    const token = jwt.sign({ id: userObject?._id }, process.env.JWT_SECRET, {
      expiresIn: "20 day",
    });

    return res
      .status(201)
      .json({ msg: "ثبت نام شما با موفقیت انجام شد", data: userObject, token });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      msg: "مشکلی سمت سرور رخ داده است",
      error,
    });
  }
};
exports.login = async (req, res) => {};
exports.getMe = async (req, res) => {};

// {
//   "username":"ramin_kp",
//       "firesName":"ramin",
//       "lastName":"kp",
//       "mobile":"09142598260",
//       "email":"ramin@gmail.com",
//       "password":"ramin1234",
// }
