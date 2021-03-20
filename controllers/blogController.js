const { commentSchema } = require('../validation_schema.js')
const fetch = require('node-fetch');

/* Blog Index Page / Landing Page
- Returns a list of all the blogs in descending order by publish date using a query string.
*/
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

/* Blog Detais Page
- Returns the specific blog post from the api using the slug.
- Returns all associated comments.
- Creates a list of quotes and conditional code re: when to post which quote on the blog post header.
*/
const blog_details = async (request, response) => {
    
    const slug = request.params.slug;

    const getPost = async () => {
        let uri = `http://localhost:9000/posts?slug=${slug}`;
        const fetch_response = await fetch(uri);
        if (fetch_response.status !== 200){
            throw new Error();
        }
        let post = await fetch_response.json();
        return post[0];
    };
    let post = await getPost();

    // Sanitizes the post content of all the <p> tags:
    const regex1 = /<p>/g;
    const regex2 = /<\/p>/g;
    let sanitizedContent1 = post.content.replace(regex1, "");
    let sanitizedContent2 = sanitizedContent1.replace(regex2, "");
    
    const thisPostId = await post.id;
    

/* Fetches all comments for this specific blog post.
- Fetches comments from Api using Query String
- Sends an ID to the view which is the next ID in the comment range for IF a user wants to Post a new comment.
- Capitalizes all commenting user's names for clean display.
- Filters the comments by ones which apply to this specific blog post.
- Returns the filtered array of comments to display and the next id in the series.
*/
    const getComments = async () => {
        const uri = await fetch('http://localhost:9000/comments/?_sort=date&_order=desc')
        const fetch_response = await uri.json();
        const id = fetch_response.length;
        let commentsToUse = [];
        fetch_response.forEach(comment => {
            comment.user = comment.user.charAt(0).toUpperCase() + comment.user.slice(1);
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

    // An array of quotes to fill the blog article headers with.
    const quotes = [
        ["Good health is not something we can buy. However, it can be an extremely valuable savings account.", "Anne Wilson Schaef"],
        ["There's nothing more important than good health - that's our principal capital asset.", "Arlen Specter"],
        ["A healthy outside starts from the inside", "Robert Urich"],
        ["Sleep is that golden chain that ties health and our bodies together", "Thomas Dekker"],
        ["I believe the greatest gift you can give your family and the world is a healthy you.", "Joyce Meyer" ]
    ];

    let quote;
    let quote_author;
    switch (post.id % 5){
        case 0:
            quote = quotes[0][0];
            quote_author = quotes[0][1];
            break;
        case 1:
            quote = quotes[1][0];
            quote_author = quotes[1][1];
            break;
        case 2:
            quote = quotes[2][0];
            quote_author = quotes[2][1];
            break;
        case 3:
            quote = quotes[3][0];
            quote_author = quotes[3][1];
            break;
        case 4:
            quote = quotes[4][0];
            quote_author = quotes[4][1];
            break;
    }

    const source_url = request.header('Referer');

    // replace all incidences of <p> & </p> with actual markdown?
    response.render('get_blog_post', {  post: post,
                                        postContent: sanitizedContent2,
                                        comments: commentsToUse, 
                                        id: id, 
                                        title: "Blog Post", 
                                        quote:quote, 
                                        quote_author:quote_author,
                                        source_url: source_url});
};


/* Post New Comment Functionality
- Validates the comment posted using Joi
- Creates a new comment obj to post to API 
- Gets the new comment ID from a hidden field on the comment form which is the length of comments + 1
- Doesn't set parentID because I don't know what that refers to.
- Sets the user, date and content.
- POSTs the new & validated comment to the API & reloads the page.
*/
const post_comment = async (request, response) => {

    const result = await commentSchema.validateAsync(request.body);

    const commentToPost = {
        id: parseInt(result.id),
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