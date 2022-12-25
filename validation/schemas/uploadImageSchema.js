const Joi = require('joi')

const uploadImageSchema = Joi.object({
    image: Joi.required(),
});

module.exports = {
    uploadImageSchema
}

