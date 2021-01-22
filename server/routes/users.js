const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

// All Users Routen
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).send(users);
  } catch (error){
    res.status(500).send(error);
  }
});

// Delete Book Page
router.delete("/:id", async (req, res) => {
  console.log('delete route')
  let user;
  try {
    user = await User.findById(req.params.id);
    const response = await user.remove().exec();
    res.send(response);
  } catch (error) {
      res.status(500).send(error);
    
  }
});

// Create User Route
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
  });
  saveProfileImage(user, req.body.filepond);

  try {
    const response = await user.save();
    response.send(response)
  } catch (error) {
    response.status(500).send(error); 
    // renderNewPage(res, user, true)
  }
});

// router.get("/:id", async (req, res) => {
//   let user;
//   try {
//     const user = await User.findById(req.params.id).exec();
//     res.status(200).(user)
//   } catch (error) {
//    res.status(500).send(error);
//   }
// });

function saveProfileImage(user, profileImageEncoded) {
  if (profileImageEncoded == null) return;
  const profileImage = JSON.parse(profileImageEncoded);
  if (profileImage != null && imageMimeTypes.includes(profileImage.type)) {
    user.profileImage = new Buffer.from(profileImage.data, "base64");
    user.profileImageType = profileImage.type;
  }
}

module.exports = router;
