const Joi = require('joi')

const createMapSchema = Joi.object({
    map: Joi.string().required(),
});


module.exports = {
    createMapSchema,
}

