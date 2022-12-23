const express = require('express');
const router = express.Router()
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const paginatedResults = require('../middlewares/paginatedResults');

// validation
const Validator = require('../validation/middlewares/validateMiddleware');
// Model
const db =  require("../models");
const User = db.users;

const { getAllUsers, getUser, createUser, updateUser, deleteUser} = require("../controllers/usersController.js");

router.route('/all').get([verifyIsAdmin(), paginatedResults(User)], getAllUsers)
router.route('/create').post([verifyIsAdmin(), Validator('createUserSchema')], createUser)
router.route('/update').post([verifyIsAdmin(), Validator('updateUserSchema')], updateUser)
router.route('/delete').post([verifyIsAdmin(), Validator('deleteUserSchema')], deleteUser)


// router.route('/:id').get(getUser);   
router.route("/profile").get( getUser);

module.exports = router
