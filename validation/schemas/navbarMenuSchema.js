const Joi = require('joi')

const createNavbarMenuSchema = Joi.object({
    e_title: Joi.string().required(),
    m_title: Joi.string().required(),
    priority: Joi.number().integer().positive().min(1).required(),
    published: Joi.boolean().required(),
});

const updateNavbarMenuSchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
    e_title: Joi.string().required(),
    m_title: Joi.string().required(),
    priority: Joi.number().integer().positive().min(1).required(),
    published: Joi.boolean().required(),
});

const deleteNavbarMenuSchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
});

module.exports = {
    createNavbarMenuSchema,
    updateNavbarMenuSchema,
    deleteNavbarMenuSchema
}

