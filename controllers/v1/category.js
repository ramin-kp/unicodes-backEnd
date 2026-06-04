const mongoose = require("mongoose");
const categoryModel = require("./../../models/category");
const validator = require("./../../validators/category");

exports.get = async (req, res) => {
  try {
    const categories = await categoryModel.find({}).lean();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      msg: "مشکلی سمت سرور رخ داده است",
      error,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, slug } = req.body;
    const categoryValidatorResult = validator(req.body);

    if (categoryValidatorResult !== true) {
      return res.status(429).json({
        msg: "فیلدهای ارسالی معتبر نمی باشد",
        validatorMsg: categoryValidatorResult,
      });
    }
    const category = await categoryModel.create({ title, slug });
    return res
      .status(201)
      .json({ msg: "دسته بندی جدید باموفقیت ایجاد شد", category });
  } catch (error) {
    return res.status(500).json({
      msg: "مشکلی سمت سرور رخ داده است",
      error,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const isValidId = mongoose.Types.ObjectId.isValid(categoryId);

    if (!isValidId) {
      return res.status(429).json({
        msg: "آیدی دسته‌بندی معتبر نیست",
      });
    }
    const category = await categoryModel.findOneAndDelete({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ msg: "دسته بندی با این آیدی یافت نشد" });
    }
    return res.status(200).json({ msg: "دسته بندی باموفقیت حذف شد", category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "مشکلی سمت سرور رخ داده است",
      error,
    });
  }
};
