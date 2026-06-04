const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
    isAnswer: {
      type: Boolean,
      required: true,
    },
    mainComment: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  },

  { timestamps: true },
);

const model = mongoose.model("Comment", schema);

module.exports = model;
