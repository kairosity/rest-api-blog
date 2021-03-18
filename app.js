const { render } = require('ejs');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { authSchema } = require('./validation_schema.js')
const createError = require('http-errors');
const User = require('./models/users');
const blogRoutes = require('./routes/blogRoutes');
const morgan = require('morgan');
const fetch = require('node-fetch');
const { mongoURL } = require('./config');
const bcrypt = require('bcrypt');
const saltRounds = 12;


// Create Express App
const app = express();

// Connect to Mongo via Mongoose
mongoose.connect(mongoURL, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// blog routes
app.use(blogRoutes);

// GET REGISTER 
app.get('/register', (request, response) => {
    response.render('register', { title: "Register" });
});


// POST REGISTER NEW USER
app.post('/register', async (request, response, next) => {

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
});

// GET LOGIN 
app.get('/login', (request, response) => {
    response.render('login', { title: "Login" });
});

// POST LOGIN
app.post('/login', (request, response) => {
    const user = new User(request.body);

    let username = request.body.username;
    let password = request.body.password;
});

// GET CREATE NEW BLOG (Admin only)
app.get('/blog/create', (request, response) => {
    response.render('create', { title: "Create New Blog Post" })
});

// POST CREATE NEW BLOG (Admin only)
app.post('/blog/create', (request, response) => {
    response.render('create', { title: "Create New Blog Post" })
});

// GET About Page View
app.get('/about', (request, response) => {
    response.render('about', { title: "About" });
});

// 404 Page View
app.use((request, response) => {
    response.status(404).render('404', { title: "404 Not Found!" });
});