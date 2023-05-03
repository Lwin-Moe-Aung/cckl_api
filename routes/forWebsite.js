const express = require('express');
const router = express.Router()

//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { getNavbarDataE, getNavbarDataM, getDetailE, getDetailM } = require("../controllers/websiteController.js");


router.route('/navbar/e').get( tryCatch(getNavbarDataE))
router.route('/navbar/m').get( tryCatch(getNavbarDataM))
router.route('/detail-e/:id').get( tryCatch(getDetailE))
router.route('/detail-m/:id').get( tryCatch(getDetailM))



module.exports = router
