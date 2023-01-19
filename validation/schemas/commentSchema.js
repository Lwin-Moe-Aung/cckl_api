const Joi = require('joi')

const createCommentSchema = Joi.object({
    comment: Joi.string().required(),
    parent_id: Joi.allow(),
});

const updateCommentSchema = Joi.object({
    comment: Joi.string().required(),
});

const deleteCommentSchema = Joi.object({
    comment: Joi.string().required(),
    parent_id: Joi.allow(),
});

module.exports = {
    createCommentSchema,
    updateCommentSchema,
    deleteCommentSchema
}

