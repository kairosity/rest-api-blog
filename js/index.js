// Write the logic that sends through the blog data to app.js so it can then send that data to the template index.html.

// const contentContainer = document.querySelector('.articles');
// const search = document.querySelector('.search');

// The function that fetches the API data and at the end of which it will send an array of json data to app.js? 
// OR.... should it route to the view from here? 

console.log("This worked.");

let name = "Karina";

const renderPosts = async (keyword) => {
    let uri = 'http://localhost:9000/posts?_sort=publish_date&_order=desc';

    if (keyword) {
        uri += `&q=${keyword}`;
    }
    
    const res = await fetch(uri);
    let articles = await res.json();

    return articles;
    
    // let template = '';
    // articles.forEach(article => {
    //     template += `
    //         <div class="post">
    //             <h2>${article.title}</h2>
    //             <p>${article.publish_date}</p>
    //             <p>${article.description}</p>
    //             <p>${article.content.slice(0,200)}</p>
    //             <a href="/get_article.html?id=${article.id}">read more...</a>
    //         </div>
    //     `
    // });

    // contentContainer.innerHTML = template;
};


// // search.addEventListener('submit', (e) => {
// //     e.preventDefault();
// //     renderPosts(search.keyword.value.trim());
// // });

// // window.addEv

// articles = renderPosts();

// exports.articles = articles; 