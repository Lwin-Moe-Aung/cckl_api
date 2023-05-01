const express = require('express');
const router = express.Router();

//* middlewares
const profileUploader = require('../middlewares/userProfileImagesUploader');
const postImageUploader = require('../middlewares/postImagesUploader');
const logoUploader = require('../middlewares/logoUploader');
const bannerUploader = require('../middlewares/bannerUploader');
const peopleUploader = require('../middlewares/peopleUploader');

//* controller
const { uploadBannerImage, uploadProfile, uploadPostImage, uploadLogoImage, uploadPeopleImage } = require("../controllers/uploadsController.js");

//* try catch
const { tryCatch } = require('../utils/tryCatch');

router.route('/profile').post(profileUploader.single('photo'), tryCatch(uploadProfile) )
router.route('/post-image').post(postImageUploader.single('image'), tryCatch(uploadPostImage) )
router.route('/logo').post(logoUploader.single('image'), tryCatch(uploadLogoImage) )
router.route('/banner').post(bannerUploader.single('image'), tryCatch(uploadBannerImage) )
router.route('/people').post(peopleUploader.single('image'), tryCatch(uploadPeopleImage) )


module.exports = router
