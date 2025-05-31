const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
