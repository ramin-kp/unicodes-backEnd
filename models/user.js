const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firesName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: [
        "SUPER_ADMIN",
        "USER",
        "TEACHER",
        "SEO",
        "AUTHOR",
        "ADMIN",
        "MARKETING",
      ],
      default: "USER",
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const model = mongoose.model("User", schema);

module.exports = model;
