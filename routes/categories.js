const express = require('express');
const router = express.Router()
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
const { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory} = require("../controllers/categoriesController.js");

router.route('/all').get([verifyIsAdmin(), paginatedResults(Category)], tryCatch(getAllCategories))
router.route('/create').post([verifyIsAdmin(), Validator('createCategorySchema')], tryCatch(createCategory))
router.route('/update').post([verifyIsAdmin(), Validator('updateCategorySchema')], tryCatch(updateCategory))
router.route('/delete').post([verifyIsAdmin(), Validator('deleteCategorySchema')], tryCatch(deleteCategory))
router.route('/:id').get([verifyIsAdmin()], tryCatch(getCategory))
module.exports = router
