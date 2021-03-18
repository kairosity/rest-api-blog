const express = require('express');
const fetch = require('node-fetch');
const blogController = require('../controller/blogController');
const { commentSchema } = require('../validation_schema.js')


const router = express.Router();

// GET HOME REDIRECT FROM / --> /blog
router.get('/', async (request, response) => {
    response.redirect('/blog');    
});

// GET HOME
router.get('/blog', async (request, response) => {
    
});

// GET INDIVIDUAL BLOG POST & ASSOCIATED COMMENTS
router.get('/blog/:slug', async (request, response) => {
    
    const slug = request.params.slug;

    // Find the blog from the api with the slug passed in.
    const getPost = async () => {
        let uri = `http://localhost:9000/posts?slug=${slug}`;
        const fetch_response = await fetch(uri);
        if (fetch_response.status !== 200){
            throw new Error();
        }
        let post = await fetch_response.json();
        return post[0];
        
    };
    const post = await getPost();
    const thisPostId = await post.id;
    // Gather all the comments on this specific blog post.
    const getComments = async () => {
        const uri = await fetch('http://localhost:9000/comments/')
        const fetch_response = await uri.json();
        const id = fetch_response.length;
        let commentsToUse = [];
        fetch_response.forEach(comment => {
            if (comment.postId == thisPostId){
                commentsToUse.push(comment);
            } 
        });
        return { 
            commentsToUse,
            id
        };
    };

    const { commentsToUse, id } = await getComments();

    // replace all incidences of <p> & </p> with actual markdown?
    response.render('get_blog_post', { post: post, comments: commentsToUse, id: id, title: "Blog Post" });
});

// POST A COMMENT 
router.post('/blog/:slug', async (request, response) => {

        const result = await commentSchema.validateAsync(request.body);

        const commentToPost = {
            id: parseInt(result.id), //find len of comments and then add 1
            postId: parseInt(result.postId),
            parentId: null,
            user: result.user,
            date: new Date().toISOString().substr(0, 10),
            content: result.content
        };
    
        await fetch('http://localhost:9000/comments', {
            method: 'POST',
            body: JSON.stringify(commentToPost),
            headers: {'Content-Type': 'application/json'}
        });
        response.redirect(request.url)
    });

// DELETE A COMMENT

router.delete('/:slug', async (request, response) => {
    console.log('got here')
});


module.exports = router;