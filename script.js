// script.js

window.onload = async function() {
    // Fetch existing posts from the server
    const response = await fetch('/getposts');
    const posts = await response.json();

    // Render the posts in the HTML
    const postsDiv = document.getElementById('posts');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h3>${post.Title}</h3>
            <p>Author: ${post.Author}</p>
            <p>${post.Content}</p>
            <button onclick="deletePost('${post.PostID}')">Delete</button>
        `;
        postsDiv.appendChild(postElement);
    });
};

document.getElementById('postForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/addpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            author: author,
            content: content
        })
    });

    if (response.ok) {
        alert('Post added successfully!');
        location.reload();
    } else {
        alert('Error adding post!');
    }
});

async function deletePost(postID) {
    const response = await fetch(`/deletepost/${postID}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Post deleted successfully!');
        location.reload();
    } else {
        alert('Error deleting post!');
    }
}
