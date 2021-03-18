const { commentSchema } = require('../validation_schema.js')

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

//

module.exports = {
    blog_index
}