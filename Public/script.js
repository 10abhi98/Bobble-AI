// Success Design Template ------>
function successDesign(user, template) {
    // User Details
    var image = template == "Google" ? user.getImageUrl() : "http://graph.facebook.com/" + user.id + "/picture?type=square";
    var id = template == "Google" ? user.getId() : user.id;
    var name = template == "Google" ? user.getName() : user.name;
    var email = template == "Google" ? user.getEmail() : 'N/A';

    // Open Modal
    $('#register').modal('show');
    // Add Content to Modal after Successful Signup
    $('.modal-body').html(`
        <div id = 'gogImg'>
            <img class = 'float-left' src = '${image}' alt = 'user_Picture'> 
            <p>ID : <strong><em></em>${id}</strong></p>
            <p>Name : <strong><em>${name}</em></strong></p>
            <p>Email : <strong><em>${email}</em></strong></p>
        </div>
        <p class = 'float-right pt-3 px-2'><em>User Registered Successfully</em></p>
    `);
    $('#gogImg img').css({
        'width': '70px',
        'height': '70px'
    });
    $('#gogImg p').css({
        'margin-left': '80px',
        'margin-bottom': '8px',
    });
    $('#gogImg').css({
        'margin-bottom': '15px'
    });
}

// Failure Design Template ------>
function failDesign() {
    // Open Modal
    $('#register').modal('show');
    // Add Content to Modal after failed Signup
    $('.modal-body').html(`
        <p><em>Alass!!User Authorization Failed...Please Try Again</em><p>
    `).css('text-align', 'center');
}

// SHOW AND HIDE PASSWORD -------------------------------------------->
$(function() {
    $(document).on('click', '.show-icon', function(e) {
        e.preventDefault();
        var ip = $(this).parents('.input-group').children('input');

        ip.attr('type', 'text');
        $(this).children('i').removeClass('fa-eye');
        $(this).children('i').addClass('fa-eye-slash');
        $(this).addClass('hide-icon');
        $(this).removeClass('show-icon');
    }).on('click', '.hide-icon', function(e) {
        e.preventDefault();
        var ip = $(this).parents('.input-group').children('input');

        ip.attr('type', 'password');
        $(this).children('i').removeClass('fa-eye-slash');
        $(this).children('i').addClass('fa-eye');
        $(this).addClass('show-icon');
        $(this).removeClass('hide-icon');
        return false;
    });
});
// ------------------------------------------------------------------->

// IMPLEMENT GOOGLE SIGNUP ON YOUR WEBSITE --------------------------->
// Basic Setup
var startApp = function() {
    gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
            client_id: '678746565997-1ek0uobfbr11g5iou189o7m0o9eom1k1.apps.googleusercontent.com',
            scope: 'email',
            cookiepolicy: 'single_host_origin',
        });
        customSignin(document.getElementById('gog'));
    });
};

// Display Google Credentials
function customSignin(element) {
    auth2.attachClickHandler(element, {},
        function(googleUser) {
            // Get JSON 
            var profile = googleUser.getBasicProfile();
            successDesign(profile, 'Google');
        },
        function(error) {
            failDesign();
            console.log(error);
        }
    );

    // Reset Content of Modal
    $('.modal-body').html('Fetching ....');
}

// Call Init Function for GOOGLE SIGN IN
startApp();
// ------------------------------------------------------------------->

// IMPLEMENT FACEBOOK SIGNUP ON YOUR WEBSITE ------------------------->
// Basic Setup
window.fbAsyncInit = function() {
    FB.init({
        appId: '233836498028018',
        cookie: true,
        xfbml: true,
        version: 'v8.0'
    });
};

// Custom Login Function
$('#fb').on('click', function() {
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
                successDesign(response, 'Facebook');
            });
        } else {
            failDesign();
        }
    }, { scope: 'public_profile, email' });

    // Reset Content of Modal
    $('.modal-body').html('Fetching ....');
});
// ------------------------------------------------------------------->

// IMPLEMENT NORMAL SIGNUP ON YOUR WEBSITE --------------------------->
$(function() {
    $('form').submit(function(e) {
        e.preventDefault();
        // Store Values from Form
        fname = $('#fname').val();
        lname = $('#lname').val();

        // Open Modal
        $('#register').modal('show');

        $.ajax({
            url: "https://reqres.in/api/register",
            type: "POST",
            data: {
                email: $('#email').val(),
                password: $('#pass').val()
            },
            success: function(response) {
                // Add Content to Modal after Successful Signup
                $('.modal-body').html(`
                    <p><strong>Id</strong> - ${response.id}</p>
                    <p><strong>Name</strong> - <em>${fname} ${lname}</em></p>
                    <p><strong>Token</strong> - <em>${response.token}<em></p>
                    <p class = 'float-right px-2'><em>User Registered Successfully</em></p>
                `).css('text-align', 'start');
            },
            error: function(textStatus, errorThrown) {
                failDesign();
                console.log(errorThrown);
            }
        });

        // Reset Content of Modal
        $('.modal-body').html('Fetching ....');

        // Clear Fields on Submit
        $('#fname').val('');
        $('#lname').val('');
        $('#email').val('');
        $('#pass').val('');
    });
});
// ------------------------------------------------------------------->