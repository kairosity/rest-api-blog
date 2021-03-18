const { render } = require('ejs');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const morgan = require('morgan');

const { mongoURL } = require('./config');



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
// user routes
app.use(userRoutes);



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