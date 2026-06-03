const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const model = mongoose.model("BanUser", schema);

module.exports = model;
