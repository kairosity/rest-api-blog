const commentForm = document.querySelector('.comment-form');

const addComment = async (e) => {
    e.preventDefault();

 

    const comment = {
        author: commentForm.name.value,
        content: commentForm.comment.value 
    };

    await fetch('http://localhost:9000/comments', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {'Content-Type': 'application/json'}
    });

    window.location.replace('/index.html');
};

commentForm.addEventListener('submit', addComment);