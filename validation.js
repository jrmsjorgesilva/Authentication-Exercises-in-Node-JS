//VALIDATION
const joi = require('@hapi/joi');

//REGISTER VALIDATION
const registerValidation = (data) => {
    const schema = {
        name: joi.string().min(6).required(),
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().min(6).max(1024).required()
    };
    return joi.validate(data, schema);
}

//LOGIN VALIDATION
const loginValidation = (data) => {
    const schema = {
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().min(6).max(1024).required()
    };
    return joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;