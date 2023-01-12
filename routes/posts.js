const express = require('express');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const paginatedResults = require('../middlewares/paginatedResults');

//* validation
const Validator = require('../validation/middlewares/validateMiddleware');

//* Model
const db =  require("../models");
const Post = db.posts;

//* try catch
const { tryCatch } = require('../utils/tryCatch');

//* contorller 
const { getAllPosts, getPost, createPost, updatePost, deletePost, checkSlug} = require("../controllers/postController.js");

router.route('/all').get(tryCatch(getAllPosts))
router.route('/:slug').get(tryCatch(getPost))

router.route('/create').post([verifyJWT, verifyIsAdmin(), Validator('createPostSchema')], tryCatch(createPost))
router.route('/update').post([verifyJWT, verifyIsAdmin(), Validator('updatePostSchema')], tryCatch(updatePost))
router.route('/delete').post([verifyJWT, verifyIsAdmin(), Validator('deletePostSchema')], tryCatch(deletePost))
router.route('/check-slug').post([verifyJWT, verifyIsAdmin(), Validator('checkSlugSchema')], tryCatch(checkSlug))


module.exports = router
  