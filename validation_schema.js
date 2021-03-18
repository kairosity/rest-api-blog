const Joi = require('@hapi/joi');

const authSchema = Joi.object().keys({
    username: Joi.string().trim().lowercase().required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().min(5).max(300).required(),
    passwordConfirmation: Joi.string().min(5).max(300).required()
});

const commentSchema = Joi.object().keys({
    id: Joi.any(),
    postId: Joi.any(),
    parentId: Joi.any(),
    user: Joi.string().trim().lowercase().required(),
    date: Joi.date(),
    content: Joi.string().trim().min(5).max(8000).required(),
});

module.exports = {
    authSchema,
    commentSchema
}