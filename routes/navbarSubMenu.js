const express = require('express');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

//* validation
const Validator = require('../validation/middlewares/validateMiddleware');

//* Model
// const db =  require("../models");

//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { getAllNavbarSubMenuData, getNavbarSubMenuData, createNavbarSubMenuData, updateNavbarSubMenuData, deleteNavbarSubMenuData} = require("../controllers/navbarSubMenuDataController.js");

router.route('/all').get([verifyJWT, verifyIsAdmin()], tryCatch(getAllNavbarSubMenuData))
router.route('/create').post([verifyJWT, verifyIsAdmin(), Validator('createNavbarSubMenuSchema')], tryCatch(createNavbarSubMenuData))
router.route('/update').post([verifyJWT, verifyIsAdmin(), Validator('updateNavbarSubMenuSchema')], tryCatch(updateNavbarSubMenuData))
router.route('/delete').post([verifyJWT, verifyIsAdmin(), Validator('deleteNavbarMenuSchema')], tryCatch(deleteNavbarSubMenuData))
router.route('/:id').get(tryCatch(getNavbarSubMenuData))



module.exports = router
