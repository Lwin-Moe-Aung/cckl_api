const express = require('express');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

//* validation
const Validator = require('../validation/middlewares/validateMiddleware');
//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { getAllFeature, getFeature, createFeature, updateFeature, deleteFeature } = require("../controllers/featureController.js");

router.route('/all').get([verifyJWT, verifyIsAdmin()], tryCatch(getAllFeature))
router.route('/create').post([verifyJWT, verifyIsAdmin(), Validator('createFeatureSchema')], tryCatch(createFeature))
router.route('/update').post([verifyJWT, verifyIsAdmin(), Validator('updateFeatureSchema')], tryCatch(updateFeature))
router.route('/delete').post([verifyJWT, verifyIsAdmin(), Validator('deleteFeatureSchema')], tryCatch(deleteFeature))
router.route('/:id').get([verifyJWT, verifyIsAdmin()], tryCatch(getFeature))



module.exports = router
