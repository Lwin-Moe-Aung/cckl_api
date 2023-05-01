const Joi = require('joi')

const createHeroesPeopleSchema = Joi.object({
    e_name: Joi.string().required(),
    m_name: Joi.string().required(),
    e_job_title: Joi.allow(),
    m_job_title: Joi.allow(),
    image: Joi.allow(),
    fb_link: Joi.allow(),
});

const updateHeroesPeopleSchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
    e_name: Joi.string().required(),
    m_name: Joi.string().required(),
    e_job_title: Joi.allow(),
    m_job_title: Joi.allow(),
    image: Joi.allow(),
    fb_link: Joi.allow(),
});

const deleteHeroesPeopleSchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
});

module.exports = {
    createHeroesPeopleSchema,
    updateHeroesPeopleSchema,
    deleteHeroesPeopleSchema
}

