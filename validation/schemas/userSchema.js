const Joi = require('joi')

const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
  is_admin: Joi.boolean().required(),
  photo: Joi.allow(),
});

const updateUserSchema = Joi.object({
  id: Joi.number().integer().positive().min(1).required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  new_password: Joi.allow(),
  confirmPassword: Joi.ref("new_password"),
  is_admin: Joi.boolean().required(),
  photo: Joi.allow(),
});

const deleteUserSchema = Joi.object({
  user_id: Joi.number().integer().positive().min(1).required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  deleteUserSchema
}

