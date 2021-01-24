const mongoose = require("mongoose");
const path = require('path')

const profileImageBasePath = 'uploads/profileImages'

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
  profileImageName: {
    type: String,
    required: true,
  },

}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.virtual('profileImagePath').get(function() {
  console.log('userSchema.virtual')
  if (this.profileImageName != null) {
    return path.join('/', profileImageBasePath, this.profileImageName)
  }
})

module.exports = mongoose.model("User", userSchema)
module.exports.profileImageBasePath = profileImageBasePath