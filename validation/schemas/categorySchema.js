const Joi = require('joi')

const createCategorySchema = Joi.object({
    name: Joi.string().required(),
    published: Joi.boolean().required(),
});

const updateCategorySchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
    name: Joi.string().required(),
    published: Joi.boolean().required(),
});

const deleteCategorySchema = Joi.object({
    category_id: Joi.number().integer().positive().min(1).required(),
});

module.exports = {
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema
}

