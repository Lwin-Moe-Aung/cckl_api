const Joi = require('joi')

const createPostSchema = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    user_id: Joi.number().integer().positive().min(1).required(),
    category_id: Joi.number().integer().positive().min(1).required(),
    published: Joi.boolean().required(),
});

const updatePostSchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
    title: Joi.string().required(),
    slug: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    user_id: Joi.number().integer().positive().min(1).required(),
    category_id: Joi.number().integer().positive().min(1).required(),
    published: Joi.boolean().required(),
});

const deletePostSchema = Joi.object({
    post_id: Joi.number().integer().positive().min(1).required(),
});

module.exports = {
    createPostSchema,
    updatePostSchema,
    deletePostSchema
}

