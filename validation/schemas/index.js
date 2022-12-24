const { createUserSchema, updateUserSchema, deleteUserSchema } = require('./userSchema');
const { createCategorySchema, updateCategorySchema, deleteCategorySchema } = require('./categorySchema');
module.exports = {
    createUserSchema,
    updateUserSchema,
    deleteUserSchema,
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema
}

