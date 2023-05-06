const Joi = require('joi')

const createFeatureSchema = Joi.object({
    e_title: Joi.string().required(),
    m_title: Joi.string().required(),
    color: Joi.string().required(),
    icon: Joi.string().required(),
    e_description: Joi.string().required(),
    m_description: Joi.string().required(),
    
});

const updateFeatureSchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
    e_title: Joi.string().required(),
    m_title: Joi.string().required(),
    color: Joi.string().required(),
    icon: Joi.string().required(),
    e_description: Joi.string().required(),
    m_description: Joi.string().required(),
});

const deleteFeatureSchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
});

module.exports = {
    createFeatureSchema,
    updateFeatureSchema,
    deleteFeatureSchema
}

