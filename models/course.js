const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDes: {
      type: String,
      required: true,
    },
    longDes: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["publish", "pending", "onActive"],
    },
    support: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true },
);

schema.virtual("sessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "course",
});

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "course",
});

const model = mongoose.model("Course", schema);

module.exports = model;
