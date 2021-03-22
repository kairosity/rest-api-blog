const { render } = require('ejs');
const express = require('express');
const session = require('express-session');
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const mongoose = require('mongoose');
const User = require('./models/users');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const morgan = require('morgan');
const passport = require('passport');
const {getSession, getUser} = require('./helpers');

const flash = require('connect-flash');
const { mongoURL, SESSION_LIFETIME, SESSION_SECRET } = require('./config');

// Passport config
require('./passport-config')(passport);

// Create Express App
const app = express();

// Connect to Mongo via Mongoose
mongoose.connect(mongoURL, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// Middleware & Static files
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Express Session
app.use(session({
        secret: SESSION_SECRET,
        maxAge: SESSION_LIFETIME,
        sameSite: true,
        resave: true,
        saveUnitialized: true,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Variables for Flash Messages
app.use((request, response, next) => {
    response.locals.success_msg = request.flash('success_msg');
    response.locals.error_msg = request.flash('error_msg');
    response.locals.error = request.flash('error');
    next();
});

// Blog routes
app.use(blogRoutes);
// User routes
app.use(userRoutes);

// 404 Page View
app.use((request, response) => {

    let session = getSession(request);
    let username = getUser(request);

    response.status(404).render('404', { 
                                        title: "404 Not Found!", 
                                        session: session,
                                        username: username 
                                    });
});