
$(document).ready(function () {

    function validateField(field, condition, errorElement) {

        if (condition) {
            $(field).removeClass('invalid');
            $(errorElement).hide();
            return true;
        } else {
            $(field).addClass('invalid');
            $(errorElement).show();
            return false;
        }
    }

    $('#userName').on('input', function () {
        $('#prevName').text($(this).val() || '---');
        validateField('#userName', $(this).val().trim() !== '', '#nameError');
    });

    $('#bio').on('input', function () {
        $('#prevBio').text($(this).val() || '---');
    });

    $('#interests').on('input', function () {

        const interests = $(this).val().split(',');

        $('#interestTags').html('');

        interests.forEach(function (interest) {

            if (interest.trim() !== '') {
                $('#interestTags').append(`<span class="tag">${interest.trim()}</span>`);
            }
        });
    });

    $('#studentID').on('input', function () {
        validateField('#studentID', /^\d+$/.test($(this).val()), '#idError');
    });

    $('#userEmail').on('input', function () {
        validateField('#userEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($(this).val()), '#emailError');
    });

    $('#userPass').on('input', function () {
        validateField('#userPass', $(this).val().length >= 8, '#passError');
    });

    $('#confirmPass').on('input', function () {
        validateField('#confirmPass', $(this).val() === $('#userPass').val(), '#confirmError');
    });

    $('#registrationForm').submit(function (e) {

        e.preventDefault();

        const valid =
            validateField('#userName', $('#userName').val().trim() !== '', '#nameError') &
            validateField('#studentID', /^\d+$/.test($('#studentID').val()), '#idError') &
            validateField('#userEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#userEmail').val()), '#emailError') &
            validateField('#userPass', $('#userPass').val().length >= 8, '#passError') &
            validateField('#confirmPass', $('#confirmPass').val() === $('#userPass').val(), '#confirmError') &
            validateField('#campus', $('#campus').val() !== '', '#campusError');

        if (valid) {

            const userData = {
                name: $('#userName').val(),
                id: $('#studentID').val(),
                campus: $('#campus').val(),
                email: $('#userEmail').val(),
                bio: $('#bio').val(),
                interests: $('#interests').val().split(',')
            };

            localStorage.setItem('activeUser', JSON.stringify(userData));

            window.location.href = 'profile.html';
        }
    });
});
