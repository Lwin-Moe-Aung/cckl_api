const express = require('express');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

//* validation
const Validator = require('../validation/middlewares/validateMiddleware');

//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { createHeroesText, getHeroesText} = require("../controllers/heroesTextController.js");

//* get published categories

router.route('/create').post([verifyJWT, verifyIsAdmin(), Validator('createHeroesTextSchema')], tryCatch(createHeroesText))
router.route('/').get([verifyJWT, verifyIsAdmin()], tryCatch(getHeroesText))



module.exports = router
