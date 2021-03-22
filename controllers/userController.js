const { authSchema } = require('../validation_schema.js');
const createError = require('http-errors');
const User = require('../models/users');

const bcrypt = require('bcryptjs');
const saltRounds = 12;
const fetch = require('node-fetch');


// get register_page
const register_user_page = (request, response) => {
    response.render('register', { title: "Register" });
};

// register_user
const register_user = async (request, response, next) => {

    try {
        // Get form user details.
        const userDetails =  {username, email, password, passwordConfirmation} = request.body;
        // Validations using Joi
        const result = await authSchema.validateAsync(request.body);

        let errors = [];

        // Custom Validations: Check Username is unique
        const usernameExists = await User.findOne({username: result.username});
        console.log(usernameExists)
        if (usernameExists) {
            errors.push({ msg: `"${result.username}" is already registered. If this is you, please login, otherwise please choose a different username.` })
        }
         // Custom Validations: Check Email is unique
        const emailExists = await User.findOne({email: result.email});
        if (emailExists) {
            errors.push({ msg: `"${result.email}" is already registered. If this is you, please login, otherwise please choose a different email. Thank You.`});
        }
        // Custom Validations: Check passwords match
        if (password !== passwordConfirmation){
            errors.push({ msg: "Passwords do not match."});
        }

        if (errors.length > 0){
            response.render('register', {
                errors: errors,
                username: username,
                email: email,
                password: password,
                passwordConfirmation: passwordConfirmation,
                title: "Register"
            });
        } else {

            const newUser = new User({
                username: result.username,
                email: result.email, 
                password: result.password
            });

            // const hashedPassword = await bcrypt.hash(result.password, 10);
            bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(result.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            request.flash('success_msg', 'You are now registered and can log in.')
                            response.redirect('/login');
                        })
                        .catch(err => console.log(err));

                }));

        }

    } catch (error) {
        
        if (error.isJoi === true) error.status = 422;
        next(error);
        response.redirect('register');
    }
};

// get login page
const login_page = (request, response) => {
    response.render('login', { title: "Login" });
};

// get user dashboard
const user_dashboard = (request, response) => {
    response.render('user_dashboard', { title: "User Dashboard" });
};


module.exports = {
    register_user_page,
    register_user,
    login_page,
    user_dashboard
};