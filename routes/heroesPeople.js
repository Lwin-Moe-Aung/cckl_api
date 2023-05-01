const express = require('express');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

//* validation
const Validator = require('../validation/middlewares/validateMiddleware');


//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { getAllHeroesPeople, getHeroesPeople, createHeroesPeople, updateHeroesPeople, deleteHeroesPeople} = require("../controllers/heroesPeopleController.js");


router.route('/all').get([verifyJWT, verifyIsAdmin()], tryCatch(getAllHeroesPeople))
//* get published categories
router.route('/create').post([verifyJWT, verifyIsAdmin(), Validator('createHeroesPeopleSchema')], tryCatch(createHeroesPeople))
router.route('/update').post([verifyJWT, verifyIsAdmin(), Validator('updateHeroesPeopleSchema')], tryCatch(updateHeroesPeople))
router.route('/delete').post([verifyJWT, verifyIsAdmin(), Validator('deleteHeroesPeopleSchema')], tryCatch(deleteHeroesPeople))
router.route('/:id').get([verifyJWT, verifyIsAdmin()], tryCatch(getHeroesPeople))



module.exports = router
