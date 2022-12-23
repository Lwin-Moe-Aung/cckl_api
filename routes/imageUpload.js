const express = require('express');
const router = express.Router();

const uploader = require('../middlewares/userProfileImagesUploader');
const { upload } = require("../controllers/uploadsController.js");

console.log("hello ----------wordl")
router.route('/profile').post(uploader.single('photo'), upload )

module.exports = router
