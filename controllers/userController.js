const { authSchema } = require('../validation_schema.js');
const createError = require('http-errors');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const fetch = require('node-fetch');


// get register_page
const register_user_page = (request, response) => {
    response.render('register', { title: "Register" });
};

// register_user
const register_user = async (request, response, next) => {

    try {
        const {username, email, password, passwordConfirmation} = request.body;
        const result = await authSchema.validateAsync(request.body);

        const usernameExists = await User.findOne({username: result.username});
        if (usernameExists) {
            throw createError.Conflict(`${result.username} already exists. If this is you, please login, otherwise choose a different username. Thank You.`)
        }

        const user = new User(result);
        const savedUser = await user.save();
        response.send(savedUser);
    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
};

const login_page = (request, response) => {
    response.render('login', { title: "Login" });
};

const login_user = (request, response) => {
    const user = new User(request.body);

    let username = request.body.username;
    let password = request.body.password;
};

module.exports = {
    register_user_page,
    register_user,
    login_page,
    login_user
};