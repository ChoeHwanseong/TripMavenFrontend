document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('post-list')) {
        loadPosts();
    }

    if (document.getElementById('write-form')) {
        document.getElementById('write-form').addEventListener('submit', addPost);
    }

    if (document.location.pathname.includes('post.html')) {
        loadPostDetails();
    }
});

function loadPosts() {
    fetch('post.json')
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById('post-list');
            postList.innerHTML = posts.map((post, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td><a href="post.html?id=${post.id}">${post.title}</a></td>
                    <td>${post.author}</td>
                    <td>${post.date}</td>
                </tr>
            `).join('');
        });
}

function addPost(event) {
    event.preventDefault();
    const newPost = {
        id: Date.now(),
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        content: document.getElementById('content').value,
        date: new Date().toISOString().split('T')[0]
    };

    fetch('post.json')
        .then(response => response.json())
        .then(posts => {
            posts.push(newPost);
            return fetch('post.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(posts)
            });
        })
        .then(() => {
            alert('게시물이 등록되었습니다.');
            location.href = 'index.html';
        });
}

function loadPostDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    fetch('post.json')
        .then(response => response.json())
        .then(posts => {
            const post = posts.find(p => p.id == postId);
            if (post) {
                document.getElementById('post-title').textContent = post.title;
                document.getElementById('post-author').textContent = post.author;
                document.getElementById('post-date').textContent = post.date;
                document.getElementById('post-content').textContent = post.content;
            } else {
                document.querySelector('.container').innerHTML = '<p>게시물을 찾을 수 없습니다.</p>';
            }
        });
}
