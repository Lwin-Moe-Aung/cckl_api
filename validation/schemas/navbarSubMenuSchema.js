const Joi = require('joi')

const createNavbarSubMenuSchema = Joi.object({
    e_title: Joi.string().required(),
    m_title: Joi.string().required(),
    e_description: Joi.string().required(),
    m_description: Joi.string().required(),
    parent_menu_id: Joi.number().integer().positive().min(1).required(),
});

const updateNavbarSubMenuSchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
    e_title: Joi.string().required(),
    m_title: Joi.string().required(),
    e_description: Joi.string().required(),
    m_description: Joi.string().required(),
    parent_menu_id: Joi.number().integer().positive().min(1).required(),
});

const deleteNavbarSubMenuSchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
});

module.exports = {
    createNavbarSubMenuSchema,
    updateNavbarSubMenuSchema,
    deleteNavbarSubMenuSchema
}

