const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  profileImage: {
    type: Buffer,
    required: true,
  },
  profileImageType: {
    type: String,
    required: true,
  },
});

userSchema.virtual("profileImagePath").get(function () {
  if (this.profileImage != null && this.profileImageType != null) {
    return `data:${
      this.profileImageType
    };charset=utf-8;base64,${this.profileImage.toString("base64")}`;
  }
});

const User = mongoose.model("User", userSchema);
module.exports = {User}
