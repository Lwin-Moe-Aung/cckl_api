const express = require('express');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const paginatedResults = require('../middlewares/paginatedResults');

//* validation
const Validator = require('../validation/middlewares/validateMiddleware');

//* Model
const db =  require("../models");
const Category = db.categories;

//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { getAllCategories, getAllPublishedCategories, getCategory, createCategory, updateCategory, deleteCategory, postCount} = require("../controllers/categoriesController.js");

router.route('/post-count').get( tryCatch(postCount))

router.route('/all').get([verifyJWT, verifyIsAdmin(), paginatedResults(Category)], tryCatch(getAllCategories))
//* get published categories
router.route('/published-categories').get([verifyJWT, verifyIsAdmin()], getAllPublishedCategories)

router.route('/create').post([verifyJWT, verifyIsAdmin(), Validator('createCategorySchema')], tryCatch(createCategory))
router.route('/update').post([verifyJWT, verifyIsAdmin(), Validator('updateCategorySchema')], tryCatch(updateCategory))
router.route('/delete').post([verifyJWT, verifyIsAdmin(), Validator('deleteCategorySchema')], tryCatch(deleteCategory))
router.route('/:id').get([verifyJWT, verifyIsAdmin()], tryCatch(getCategory))



module.exports = router
