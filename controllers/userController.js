const { authSchema } = require('../validation_schema.js');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const {getSession, getUser} = require('../helpers');


// Gets the register form page.
const register_user_page = (request, response) => {
    
    let session = getSession(request);
    let username = getUser(request);
    response.render('register', { 
                                title: "Register", 
                                session: session, 
                                username: username
                                });
};

/* Registers a new user.
- Takes in all the form details.
- Passes them through the Joi validation schema.
- Instantiates an empty errors array for using with flash messages.
- Checks a number of custom validations:
    - Does the username or email already exist? 
    - Does the password match the password confirmation value? 
- If the form inputs don't pass any of the validations (if there are errors in the array):
    - Reloads the register page and flashes the error messages to the user.
- Otherwise: creates a new user object.
- Salts & Hashes the (now validated) password using Bcryptjs.
- Saves the new user object to the Mongo DB, using Mongoose.
*/
const register_user = async (request, response, next) => {

    try {
        // Get form user details.
        const userDetails =  { username, email, password, passwordConfirmation } = request.body;

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

            // Salt & Hash User Password before saving to db
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

// Renders the login page.
const login_page = (request, response) => {
    
    let session = getSession(request);
    let username = getUser(request);
    console.log(username);
    response.render('login', { 
                    title: "Login", 
                    session: session, 
                    username: username 
                    });
};

// Renders the User Dashboard
const user_dashboard = (request, response) => {
    
    let session = getSession(request);
    let username = getUser(request);
    console.log(request.user)

    response.render('user_dashboard', { 
                    title: "User Dashboard",
                    session: session,
                    username: username 
                    });
};

// Logs the user out using passport.js (request.logout)
const logout = (request, response) => {
    request.logout();
    request.flash('success_msg', 'You have been successfully logged out.');
    response.redirect('login');
};

module.exports = {
    register_user_page,
    register_user,
    login_page,
    user_dashboard,
    logout
};