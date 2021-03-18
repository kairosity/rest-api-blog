const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

// GET HOME REDIRECT FROM / --> /blog
router.get('/', async (request, response) => {
    response.redirect('/blog');    
});

// GET HOME
router.get('/blog', blogController.blog_index);

// GET INDIVIDUAL BLOG POST & ASSOCIATED COMMENTS
router.get('/blog/:slug', blogController.blog_details);

// POST A COMMENT 
router.post('/blog/:slug', blogController.post_comment);

// DELETE A COMMENT
router.delete('/:slug', async (request, response) => {
    console.log('got here')
});

module.exports = router;