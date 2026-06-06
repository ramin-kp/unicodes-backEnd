const courseModel = require("./../../models/course");
exports.create = async (req, res) => {
  try {
    const {
      title,
      shortDes,
      longDes,
      slug,
      cover,
      video,
      status,
      support,
      author,
    } = req.body;

    const course = await courseModel.create({
      title,
      shortDes,
      longDes,
      slug,
      cover: req.file.filename,
      status,
      support,
      author: req.user._id,
    });

    const mainCourse = await courseModel
      .findOne({
        _id: course._id,
      })
      .populate("author", "-password");

    return res
      .status(201)
      .json({ msg: "دوره جدید با موفقیت ایجاد شد", data: mainCourse });
  } catch (error) {
    return res.status(500).json({
      msg: "مشکلی سمت سرور رخ داده است",
      error,
    });
  }
};
