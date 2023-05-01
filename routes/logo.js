const express = require('express');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { getLogo} = require("../controllers/logoController.js");

router.route('/').get( tryCatch(getLogo))

module.exports = router
