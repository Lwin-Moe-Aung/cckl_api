const express = require('express');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const paginatedResults = require('../middlewares/paginatedResults');

//* validation
const Validator = require('../validation/middlewares/validateMiddleware');

//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { createComment, updateComment } = require("../controllers/commentController.js");

//* get published categories
router.route('/:postId/comments').post([Validator('createCommentSchema')], tryCatch(createComment))
router.route('/:postId/comments/:commentId').put([Validator('updateCommentSchema')], tryCatch(updateComment))



module.exports = router
