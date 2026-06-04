const banUserModel = require("../../models/ban-user");
const userModel = require("../../models/user");
const { isValidObjectId } = require("mongoose");

exports.banUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId.trim()) {
      return res.status(429).json({
        msg: "آیدی کاربر نامعتبر است",
      });
    }

    const IsValidUserId = isValidObjectId(userId);
    if (!IsValidUserId) {
      return res.status(429).json({
        msg: "آیدی کاربر نامعتبر است",
      });
    }

    const userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res.status(404).json({
        msg: "کاربری با این آیدی یافت نشد",
      });
    }

    const isMobileBanded = await banUserModel.findOne({
      mobile: userData.mobile,
    });

    if (isMobileBanded) {
      return res.status(409).json({
        msg: "این شماره موبایل قبلا مسدود شده است",
      });
    }

    await banUserModel.create({ mobile: userData?.mobile });
    return res.status(200).json({
      msg: "شماره موبایل مورد نظر باموفقیت مسدود شد",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "مشکلی سمت سرور رخ داده است",
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId.trim()) {
      return res.status(429).json({
        msg: "آیدی کاربر نامعتبر است",
      });
    }

    const IsValidUserId = isValidObjectId(userId);
    if (!IsValidUserId) {
      return res.status(429).json({
        msg: "آیدی کاربر نامعتبر است",
      });
    }

    const userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res.status(404).json({
        msg: "کاربری با این آیدی یافت نشد",
      });
    }

    const deleteUser = await userModel.findOneAndDelete({ _id: userId });
    console.log("userDelete =>>>>", deleteUser);

    if (!deleteUser) {
      return res.status(404).json({ message: " کاربر یافت نشد" });
    }

    return res.status(200).json({ message: "کاربر مورد نظر با موفقیت حذف شد" });
  } catch (error) {
    return res.status(500).json({
      msg: "مشکلی سمت سرور رخ داده است",
      error,
    });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password -__v").lean();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      msg: "مشکلی سمت سرور رخ داده است",
      error,
    });
  }
};
