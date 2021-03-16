const { render } = require('ejs');
const express = require('express');
const morgan = require('morgan');
const fetch = require('node-fetch');
// const get_articles = require('./js/index')

// set up express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static('static'));
app.use(morgan('dev'));

// Homepage View
app.get('/', async (req, res) => {

    let uri = 'http://localhost:9000/posts?_sort=publish_date&_order=desc';

    const fetch_res = await fetch(uri);
    let articles = await fetch_res.json();
    console.log(articles)

    res.render('index', { title: "Health Blog", articles: articles });
});

// About Page View
app.get('/about', (req, res) => {
    res.render('about', { title: "About Us" });
});

// Create New Blog View
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create New Blog Post" })
});

// 404 Page View
app.use((req, res) => {
    res.status(404).render('404', { title: "404 Not Found!" });
});