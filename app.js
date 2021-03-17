const { render } = require('ejs');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/users')
const morgan = require('morgan');
const fetch = require('node-fetch');
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
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/* ROUTES:
- Home Redirect from / --> /blog
- GET Home @ /blog (Lists all blogs each with a link to see the full post).
- GET Individual blog post. 
    - All the post details.
    - Comments on the post.
    - Ability for logged in users to add a comment.
    - Ability for all users to like or dislike a comment.
- POST New Comment to the API.
    - POST route on the individual blog details page.
    - Comment form under the end of the blog.
    - Other comments appear underneath.
    - Event Listeners on like & dislike buttons that POST to the api.
- PUT Edit Comment.
- DELETE Comment.
- GET Register User Page.
- POST New User
- PUT User Account
- DELETE User Account
*/

// GET HOME REDIRECT FROM / --> /blog
app.get('/', async (req, res) => {
    res.redirect('/blog');    
});

// GET HOME
app.get('/blog', async (req, res) => {
    async function getAllBlogPosts(){
        let uri = 'http://localhost:9000/posts?_sort=publish_date&_order=desc';
        const fetch_res = await fetch(uri);
        let posts = await fetch_res.json();
        return posts
    }
    const posts = await getAllBlogPosts();

    res.render('index', { title: "Health Blog", posts: posts });
});

// GET INDIVIDUAL BLOG POST 
app.get('/blog/:slug', async (req, res) => {
    
    const slug = req.params.slug;

    // Find the blog from the api with the slug passed in.
    async function getPost(){
        let uri = `http://localhost:9000/posts?slug=${slug}`;
        const fetch_res = await fetch(uri);
        let post = await fetch_res.json();
        return post[0]
    }
    let post = await getPost();

    console.log(post)
    // replace all incidences of <p> & </p> with actual markdown?
    res.render('get_blog_post', { post: post, title: "Blog Post" });
    
});

// GET REGISTER 
app.get('/register', (req, res) => {
    res.render('register', { title: "Register" });
});

// POST REGISTER NEW USER
app.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save()
        .then((result) => {
            res.redirect('/blog');
        })
        .catch((err) => {
            console.log(err);
        });
});

// GET CREATE NEW BLOG (Admin only)
app.get('/blog/create', (req, res) => {
    res.render('create', { title: "Create New Blog Post" })
});

// POST CREATE NEW BLOG (Admin only)
app.post('/blog/create', (req, res) => {
    res.render('create', { title: "Create New Blog Post" })
});

// GET About Page View
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

// 404 Page View
app.use((req, res) => {
    res.status(404).render('404', { title: "404 Not Found!" });
});