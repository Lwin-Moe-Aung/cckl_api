const express = require('express');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

//* validation
const Validator = require('../validation/middlewares/validateMiddleware');

//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { createBanner, getBanner} = require("../controllers/bannerController.js");

//* get published categories

router.route('/create').post([verifyJWT, verifyIsAdmin(), Validator('createBannerSchema')], tryCatch(createBanner))
router.route('/').get([verifyJWT, verifyIsAdmin()], tryCatch(getBanner))



module.exports = router
