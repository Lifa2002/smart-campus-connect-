// Save user registration data to localStorage
$(document).ready(function () {

    const user = JSON.parse(localStorage.getItem('activeUser'));

    if (user) {

        $('#profName').text(user.name);
        $('#profID').text(user.id);
        $('#profEmail').text(user.email);
        $('#profCampus').text(user.campus);
        $('#profBio').text(user.bio);

        user.interests.forEach(function (interest) {

            if (interest.trim() !== '') {
                $('#profInterests').append(`<span class="tag">${interest.trim()}</span>`);
            }
        });
    }

    $('#toggleProfile').click(function () {
        $('#profileDetails').slideToggle();
    });

    $('#logoutBtn').click(function () {

        if (confirm('Clear saved data?')) {

            localStorage.clear();

            window.location.href = 'signup.html';
        }
    });
});
