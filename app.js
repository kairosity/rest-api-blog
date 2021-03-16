const { render } = require('ejs');
const express = require('express');
const morgan = require('morgan');
const fetch = require('node-fetch');

const app = express();
app.set('view engine', 'ejs');
app.listen(3000);

// middleware & static files
app.use(express.static('static'));
app.use(morgan('dev'));

// Homepage View
app.get('/', async (req, res) => {

    async function getAllBlogPosts(){
        let uri = 'http://localhost:9000/posts?_sort=publish_date&_order=desc';
        const fetch_res = await fetch(uri);
        let posts = await fetch_res.json();
        return posts
    }
    const posts = await getAllBlogPosts();

    res.render('index', { title: "Health Blog", posts: posts });
});

// About Page View
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

// Blog Details View
app.get('/blog/create', (req, res) => {
    res.render('create', { title: "Create New Blog Post" })
});

// Create New Blog Post View - need to get slug from the post object on the index template.
app.get('/blog/:slug', async (req, res) => {
    console.log(req)
    // If req.method == GET
    const slug = req.params.slug;

    console.log(`Slug is ${slug}`)

    // Go through all blogs and pull out the one with this as its slug
    async function getPost(){
        let uri = `http://localhost:9000/posts?slug=${slug}`;
        const fetch_res = await fetch(uri);
        let post = await fetch_res.json();
        console.log(post)
        return post
    }
    const post = await getPost();
    
    res.render('get_blog_post', { post: post, title: "Blog Post" });
    
});

// 404 Page View
app.use((req, res) => {
    res.status(404).render('404', { title: "404 Not Found!" });
});