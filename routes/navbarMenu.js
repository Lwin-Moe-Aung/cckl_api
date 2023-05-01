const express = require('express');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

//* validation
const Validator = require('../validation/middlewares/validateMiddleware');

//* Model
const db =  require("../models");

//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { getPublishedNavbarMenu, getAllNavbarMenu, getNavbarMenu, createNavbarMenu, updateNavbarMenu, deleteNavbarMenu} = require("../controllers/navbarMenuController.js");

router.route('/published-navbarmenus').get([verifyJWT, verifyIsAdmin()], tryCatch(getPublishedNavbarMenu))

router.route('/all').get([verifyJWT, verifyIsAdmin()], tryCatch(getAllNavbarMenu))
router.route('/create').post([verifyJWT, verifyIsAdmin()], tryCatch(createNavbarMenu))
router.route('/update').post([verifyJWT, verifyIsAdmin(), Validator('updateNavbarMenuSchema')], tryCatch(updateNavbarMenu))
router.route('/delete').post([verifyJWT, verifyIsAdmin(), Validator('deleteNavbarMenuSchema')], tryCatch(deleteNavbarMenu))
router.route('/:id').get([verifyJWT, verifyIsAdmin()], tryCatch(getNavbarMenu))



module.exports = router
