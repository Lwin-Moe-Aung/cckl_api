const { createUserSchema, updateUserSchema, deleteUserSchema } = require('./userSchema');
const { createCategorySchema, updateCategorySchema, deleteCategorySchema } = require('./categorySchema');
const { createPostSchema, updatePostSchema, deletePostSchema } = require('./postSchema');
const { checkSlugSchema } = require('./checkSlugSchema');
const { createCommentSchema, updateCommentSchema, deleteCommentSchema } = require('./commentSchema');

module.exports = {
    createUserSchema,
    updateUserSchema,
    deleteUserSchema,
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
    createPostSchema,
    updatePostSchema,
    deletePostSchema,
    checkSlugSchema,
    createCommentSchema,
    updateCommentSchema,
    deleteCommentSchema
}

