const Joi = require('joi')

const createHeroesTextSchema = Joi.object({
    e_title: Joi.string().required(),
    m_title: Joi.string().required(),
    e_description: Joi.string().required(),
    m_description: Joi.string().required(),
});

module.exports = {
    createHeroesTextSchema,
}

