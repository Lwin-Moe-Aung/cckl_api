const Joi = require('joi')

const createBannerSchema = Joi.object({
    image: Joi.string().required(),
    e_title: Joi.string().required(),
    m_title: Joi.string().required(),
});

module.exports = {
    createBannerSchema,
}

