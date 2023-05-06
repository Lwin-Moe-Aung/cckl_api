const express = require('express');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

const Validator = require('../validation/middlewares/validateMiddleware');

//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { getMap, createMap} = require("../controllers/mapController.js");

router.route('/').get( tryCatch(getMap))
router.route('/create').post([verifyJWT, verifyIsAdmin(), Validator('createMapSchema')], tryCatch(createMap))



module.exports = router
