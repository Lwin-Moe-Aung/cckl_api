const express = require('express');
const router = express.Router();

//* middlewares
const profileUploader = require('../middlewares/userProfileImagesUploader');
const postImageUploader = require('../middlewares/postImagesUploader');

//* controller
const { upload } = require("../controllers/uploadsController.js");

//* try catch
const { tryCatch } = require('../utils/tryCatch');

router.route('/profile').post(profileUploader.single('photo'), tryCatch(upload) )
router.route('/post-image').post(postImageUploader.single('image'), tryCatch(upload) )


module.exports = router
