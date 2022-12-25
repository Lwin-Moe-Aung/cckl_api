const Joi = require('joi')

const checkSlugSchema = Joi.object({
    post_title: Joi.string().required(),
});


module.exports = {
    checkSlugSchema,
}

