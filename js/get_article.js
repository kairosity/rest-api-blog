const id = new URLSearchParams(window.location.search).get('id');
console.log(id)
const contentContainer = document.querySelector('.article-details');

const renderDetails = async () => {
    const res = await fetch('http://localhost:9000/posts/'+id);
    const article = await res.json();
    console.log(article)

    const template = `
        <h1>${article.title}<h1>
        <p>by ${article.author}</p>
        <p>${article.publish_date}</p>
        <p>${article.content}</p>
    `

    contentContainer.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', () => renderDetails());

