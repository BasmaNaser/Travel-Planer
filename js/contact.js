let contactForm = document.getElementById("contactForm");

let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let subjectInput = document.getElementById("subject");
let messageInput = document.getElementById("message");

let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let subjectError = document.getElementById("subjectError");
let messageError = document.getElementById("messageError");


let myDiv = document.getElementById('myDiv');

let registerdUserlocal =
    JSON.parse(localStorage.getItem('loginedUser'));

let registerdUsersession =
    JSON.parse(sessionStorage.getItem('loginedUser'));

let registerdUserCookie = null;

let userCookie =
    document.cookie
        .split('; ')
        .find(function(cookie) {
            return cookie.startsWith('loginedUser=');
        });

if (userCookie) {

    registerdUserCookie =
        JSON.parse(
            decodeURIComponent(
                userCookie
                    .split('=')
                    .slice(1)
                    .join('=')
            )
        );

}

let myBtn = document.getElementById('mylogin');

let myProfile =
    document.getElementById('myprofile');


if (
    registerdUserlocal ||
    registerdUsersession ||
    registerdUserCookie
) {

    myBtn.innerHTML = 'Logout';

    myBtn.classList.add('btn-danger');

    myProfile.classList.remove('d-none');

} else {

    myBtn.innerHTML = 'Login';

    myBtn.classList.remove('btn-danger');

    myBtn.style.border = '1px solid #0ea5a8';

    myProfile.classList.add('d-none');

}


myBtn.onclick = function() {

    if (registerdUserlocal) {

        localStorage.removeItem('loginedUser');

    }

    if (registerdUsersession) {

        sessionStorage.removeItem('loginedUser');

    }

    if (registerdUserCookie) {

        document.cookie =
            'loginedUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

    }

    window.location.href =
        '../html/login.html';

};


myProfile.addEventListener(
    'click',
    function() {

        if (
            registerdUserlocal ||
            registerdUsersession ||
            registerdUserCookie
        ) {

            window.open(
                '../html/profile.html',
                '_self'
            );

        } else {

            myBtn.innerHTML = 'Login';

            myBtn.classList.remove('btn-danger');

            myBtn.style.border =
                '1px solid #0ea5a8';

            myProfile.classList.add('d-none');

        }

    }
);


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let isValid = true;

    nameError.innerHTML = "";
    emailError.innerHTML = "";
    subjectError.innerHTML = "";
    messageError.innerHTML = "";

    let name = nameInput.value.trim();

    let nameRegex = /^[a-zA-Z]{3,12}( [a-zA-Z]{3,12}){1,3}$/;

    if (name === "") {

        nameError.innerHTML = "Name is required.";
        isValid = false;

    } else if (!nameRegex.test(name)) {

        nameError.innerHTML =
            "Name must contain letters and spaces only.";
        isValid = false;

    } else {

        let nameParts = name.split(" ");

        for (let part of nameParts) {

            if (part.length < 3) {

                nameError.innerHTML =
                    "Each name part must contain at least 3 letters.";

                isValid = false;
                break;
            }
        }
    }

    let email = emailInput.value.trim();

    let emailRegex =
        /^[a-zA-Z0-9._%+-]{5,}@gmail\.com$/;

    if (email === "") {

        emailError.innerHTML = "Email is required.";
        isValid = false;

    } else if (!emailRegex.test(email)) {

        emailError.innerHTML =
            "Please enter a valid email address.";

        isValid = false;
    }

    let subject = subjectInput.value.trim();

    if (subject === "") {

        subjectError.innerHTML = "Subject is required.";
        isValid = false;

    } else if (subject.length < 5) {

        subjectError.innerHTML =
            "Subject must be at least 5 characters.";

        isValid = false;
    }

    let message = messageInput.value.trim();

    if (message === "") {

        messageError.innerHTML = "Message is required.";
        isValid = false;

    } else if (message.length < 10) {

        messageError.innerHTML =
            "Message must be at least 10 characters.";

        isValid = false;
    }


    if (isValid) {
    let CustomerComplaints = JSON.parse(localStorage.getItem('CustomerComplaints'))?JSON.parse(localStorage.getItem('CustomerComplaints')):[];
    CustomerComplaints.push({id: Date.now(),email:email,fullName:name,subject:subject,msg:message,status:'pending'});
    localStorage.setItem('CustomerComplaints',JSON.stringify(CustomerComplaints))
    contactForm.reset();
    let successModal = new bootstrap.Modal(
        document.getElementById("successModal")
    );

    successModal.show();

}

});
