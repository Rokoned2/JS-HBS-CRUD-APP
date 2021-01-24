const express = require("express");
const router = express.Router();
const  User  = require("../models/user");
const multer = require("multer")
const fs = require("fs")
const path = require('path')
const uploadPath = User.profileImageBasePath
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    }
    ,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage })
// .single("file")

router.post("/image", upload.any("file"), function(req, res, next) {

  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  res.send(req.files[0].filename);
});

//=================================
//             User
//=================================

// router.post("/uploadImage", (req, res) => {
//     upload(req, res, err => {
//         if (err) {
//             return res.json({ success: false, err })
//         }
//         return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
//     })
// });


// function removeUserCover(fileName) {
//   fs.unlink(path.join(uploadPath, fileName), err => {
//     if (err) console.error(err)
//   })
// }


// All Users Router
router.get("/", async (req, res) => {
  try {
    const users = await User.find({})
    console.log('users de get', users)
    res.status(200).send(users);
  } catch (error){
    res.status(500).send(error);
  }
});

// Delete User 
router.delete("/:id", async (req, res) => {

  let user;
  try {
    user = await User.findById(req.params.id);
    const response = await user.remove();
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
    profileImageName: req.body.profileImage
  });

  try {
   const response = await user.save();
   console.log('response.profileImagePath', response.profileImagePath)

  } catch (error) {
      if (user.profileImageName != null) {
      removeProfileImage(user.profileImageName)
    }
    console.log(error)
    // response.status(500).send(error); 
    // renderNewPage(res, user, true)
  }
});


function removeProfileImage(fileName) {
  fs.unlink(path.join(uploadPath, fileName), err => {
    if (err) console.error(err)
  })
}

// router.get("/:id", async (req, res) => {
//   let user;
//   try {
//     const user = await User.findById(req.params.id).exec();
//     res.status(200).(user)
//   } catch (error) {
//    res.status(500).send(error);
//   }
// });

// function saveProfileImage(user, profileImageEncoded) {
//   if (profileImageEncoded == null) return;
//   const profileImage = JSON.parse(profileImageEncoded);
//   if (profileImage != null && imageMimeTypes.includes(profileImage.type)) {
//     user.profileImage = new Buffer.from(profileImage.data, "base64");
//     user.profileImageType = profileImage.type;
//   }
// }

module.exports = router;
