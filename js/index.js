
const contentContainer = document.querySelector('.articles');

const renderPosts = async () => {
    let uri = 'http://localhost:9000/posts'
    
    const res = await fetch(uri);
    const articles = await res.json();
    
    let template = '';
    articles.forEach(article => {
        template += `
            <div class="post">
                <h2>${article.title}</h2>
                <p>${article.publish_date}</p>
                <p>${article.description}</p>
                <p>${article.content.slice(0,200)}</p>
                <a href="/get_article.html?id=${article.id}">read more...</a>
            </div>
        `
    });

    contentContainer.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', () => renderPosts());