const { commentSchema } = require('../validation_schema.js')
const fetch = require('node-fetch');

// blog_index
const blog_index = async (request, response) => {
    async function getAllBlogPosts(){
        let uri = 'http://localhost:9000/posts?_sort=publish_date&_order=desc';
        const fetch_response = await fetch(uri);
        let posts = await fetch_response.json();
        return posts
    }
    const posts = await getAllBlogPosts();

    response.render('index', { title: "Health Blog", posts: posts });
};

// blog_details
const blog_details = async (request, response) => {
    
    const slug = request.params.slug;

    // Get the specific blog post from the API
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
    // Gather all comments for this specific blog post.
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
};
//

const post_comment = async (request, response) => {

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
};

module.exports = {
    blog_index,
    blog_details,
    post_comment
};