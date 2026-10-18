
$(document).ready(function () {

    loadPosts();

    $('#submitPost').click(function () {

        const content = $('#postInput').val().trim();

        const imageFile = $('#postImage')[0].files[0];

        if (content === '' && !imageFile) {
            return;
        }

        const user = JSON.parse(localStorage.getItem('activeUser'));

        const reader = new FileReader();

        reader.onload = function (e) {

            const imageData = imageFile ? e.target.result : null;

            savePost(content, imageData, user);
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            savePost(content, null, user);
        }
    });

    $(document).on('click', '.like-btn', function () {

        const card = $(this).closest('.post-card');

        const postId = card.data('id');

        let posts = JSON.parse(localStorage.getItem('campusPosts')) || [];

        const post = posts.find(p => p.id === postId);

        post.likes++;

        localStorage.setItem('campusPosts', JSON.stringify(posts));

        $(this).find('.count').text(post.likes);

        $(this).toggleClass('liked');
    });

    $(document).on('click', '.del-btn', function () {

        if (confirm('Delete this post?')) {

            const card = $(this).closest('.post-card');

            const postId = card.data('id');

            let posts = JSON.parse(localStorage.getItem('campusPosts')) || [];

            posts = posts.filter(p => p.id !== postId);

            localStorage.setItem('campusPosts', JSON.stringify(posts));

            card.slideUp(500, function () {
                $(this).remove();
            });
        }
    });
});

function savePost(content, imageData, user) {

    const posts = JSON.parse(localStorage.getItem('campusPosts')) || [];

    const newPost = {
        id: Date.now(),
        username: user ? user.name : 'Anonymous Student',
        text: content,
        image: imageData,
        likes: 0,
        time: new Date().toLocaleString()
    };

    posts.unshift(newPost);

    localStorage.setItem('campusPosts', JSON.stringify(posts));

    renderPost(newPost, true);

    $('#postInput').val('');

    $('#postImage').val('');
}

function loadPosts() {

    const posts = JSON.parse(localStorage.getItem('campusPosts')) || [];

    posts.forEach(function (post) {
        renderPost(post, false);
    });
}

function renderPost(post, isNew) {

    const imageHTML = post.image
        ? `<img src="${post.image}" class="feed-image" alt="Post Image">`
        : '';

    const postHTML = `
        <div class="post-card" data-id="${post.id}" ${isNew ? 'style="display:none"' : ''}>

            <h4>${post.username}</h4>

            <p>${post.text}</p>

            ${imageHTML}

            <small>${post.time}</small><br><br>

            <button class="btn like-btn">
                Like (<span class="count">${post.likes}</span>)
            </button>

            <button class="btn btn-danger del-btn">
                Delete
            </button>
        </div>
    `;

    $('#feedContainer').prepend(postHTML);

    if (isNew) {
        $('.post-card').first().fadeIn(700);
    }
}
