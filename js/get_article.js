const id = new URLSearchParams(window.location.search).get('id');
console.log(`Post id is ${id}`);
const contentContainer = document.querySelector('.article-details');
const commentContainer = document.querySelector('.comments');

/* Look through json comments and pull out all the comments with the parent id == post id. 
Add the comments that apply to that specific post to the page.
*/
const renderComments = async () => {
    const res = await fetch('http://localhost:9000/comments/')
    const comments = await res.json();
    let commentsToUse = [];
    let template = ``;
    comments.forEach(comment => {
        if (comment.post_id == id) commentsToUse.push(comment);
    });
    commentsToUse.forEach(comment => {
        template += `
        <p>${comment.user}</p>
        <p>${comment.date}</p>
        <p>${comment.content}</p>
        `;
    });

    commentContainer.innerHTML = template;
};

const renderDetails = async () => {
    const res = await fetch('http://localhost:9000/posts/'+id);
    const article = await res.json();

    const template = `
        <h1>${article.title}<h1>
        <p>by ${article.author}</p>
        <p>${article.publish_date}</p>
        <p>${article.content}</p>
    `
    contentContainer.innerHTML = template;
}

// const renderComments = async () => {
//     const res = await fetch('http://localhost:9000/comments/'+id);
//     const article = await res.json();
//     console.log(article)

//     const template = `
//         <h1>${article.title}<h1>
//         <p>by ${article.author}</p>
//         <p>${article.publish_date}</p>
//         <p>${article.content}</p>
//     `

//     contentContainer.innerHTML = template;
// }

window.addEventListener('DOMContentLoaded', () => renderDetails());
window.addEventListener('DOMContentLoaded', () => renderComments());

