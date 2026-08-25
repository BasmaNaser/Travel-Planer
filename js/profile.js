let profileImage = document.getElementById('profileImage');
let changeImageBtn = document.getElementById('changeImageBtn');
let imageInput = document.getElementById('imageInput');
let deleteAccountBtn =document.getElementById('deleteAccountBtn');

let fullNameInput = document.getElementById('fullName');
let emailInput = document.getElementById('email');
let genderInput = document.getElementById('gender');
let aboutInput = document.getElementById('about');

let editBtn = document.getElementById('editBtn');
let cancelBtn = document.getElementById('cancelBtn');

let showPasswordBtn = document.getElementById('showPasswordBtn');
let passwordSection = document.getElementById('passwordSection');

let currentPasswordInput = document.getElementById('currentPassword');
let newPasswordInput = document.getElementById('newPassword');
let confirmPasswordInput = document.getElementById('confirmPassword');

let toggleCurrentPassword = document.getElementById('toggleCurrentPassword');
let toggleNewPassword = document.getElementById('toggleNewPassword');
let toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

let changePasswordBtn = document.getElementById('changePasswordBtn');
let cancelPasswordBtn = document.getElementById('cancelPasswordBtn');

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
let users = JSON.parse(localStorage.getItem('users')) || [];

let loginedUser = null;

let isEditing = false;

let cookieUser = getCookie('loginedUser');

if (cookieUser) {
    try {
        loginedUser = JSON.parse(decodeURIComponent(cookieUser));
    } catch (error) {
        console.log('Cookie error:', error);
        window.open('../html/errorpage.html','_self')
    }
}

if (!loginedUser) {

    let sessionUser =
        sessionStorage.getItem('loginedUser');

    if (sessionUser) {

        try {
            loginedUser = JSON.parse(sessionUser);
        } catch (error) {
            console.log('Session error:', error);
            window.open('../html/errorpage.html','_self')
        }

    }
}

if (!loginedUser) {

    window.open(
        '../html/errorpage.html',
        '_self'
    );
    alert('Please login first');
}

let defaultImage = '../imgs/avatar.webp';

if (loginedUser) {

    fullNameInput.value =loginedUser.name ||
        '';

    emailInput.value =
        loginedUser.email || '';

    genderInput.value =
        loginedUser.gender || '';

    aboutInput.value =
        loginedUser.about || '';

    if (loginedUser.image) {
        profileImage.src = loginedUser.image;
    } else {
        profileImage.src = defaultImage;
    }
}

function getCookie(name) {

    let cookies = document.cookie.split(';');

    for (let cookie of cookies) {

        cookie = cookie.trim();

        if (cookie.startsWith(name + '=')) {

            return cookie.substring(
                name.length + 1
            );

        }
    }

    return null;
}

function setProfileInputs(enabled) {

    fullNameInput.disabled = !enabled;

    genderInput.disabled = !enabled;

    aboutInput.disabled = !enabled;

    emailInput.disabled = true;

    changeImageBtn.disabled = !enabled;
}

editBtn.addEventListener('click', function () {

    if (!isEditing) {

        isEditing = true;

        setProfileInputs(true);

        editBtn.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Save Changes
        `;

        editBtn.classList.remove('btn-primary');

        editBtn.classList.add('btn-success');

        cancelBtn.classList.remove('d-none');

        fullNameInput.focus();

    } else {

        saveProfile();

    }
});

function saveProfile() {

    clearProfileErrors();

    let valid = true;

    let fullName =
        fullNameInput.value.trim();

    let fullNameRegex =/^[a-zA-Z]{3,12}( [a-zA-Z]{3,12}){1,3}$/;

    if (fullName === '') {

        showError(
            'fullNameError',
            'Full Name is required'
        );

        valid = false;

    } else if (!fullNameRegex.test(fullName)) {

        showError(
            'fullNameError',
            'Full Name must contain letters only'
        );

        valid = false;
    }

    if (!valid) {
        return;
    }

    let userIndex =
        users.findIndex(
            user =>
                user.email ===
                loginedUser.email
        );

    if (userIndex === -1) {

        alert('User not found');

        return;
    }

    users[userIndex].name =
        fullName;

    users[userIndex].gender =
        genderInput.value;

    users[userIndex].about =
        aboutInput.value.trim();

    if (loginedUser.image) {

        users[userIndex].image =
            loginedUser.image;

    }

    loginedUser =
        users[userIndex];

    localStorage.setItem(
        'users',
        JSON.stringify(users)
    );

    updateLoginedUser(
        loginedUser
    );

    setProfileInputs(false);

    isEditing = false;

    editBtn.innerHTML = `
        <i class="fa-solid fa-pen-to-square"></i>
        Edit Profile
    `;

    editBtn.classList.remove(
        'btn-success'
    );

    editBtn.classList.add(
        'btn-primary'
    );

    cancelBtn.classList.add(
        'd-none'
    );

    alert(
        'Profile updated successfully'
    );
}

cancelBtn.addEventListener('click', function () {

    fullNameInput.value = loginedUser.name ||
        '';

    genderInput.value =
        loginedUser.gender ||
        '';

    aboutInput.value =
        loginedUser.about ||
        '';

    if (loginedUser.image) {

        profileImage.src =
            loginedUser.image;

    } else {

        profileImage.src =
            defaultImage;

    }

    clearProfileErrors();

    setProfileInputs(false);

    isEditing = false;

    editBtn.innerHTML = `
        <i class="fa-solid fa-pen-to-square"></i>
        Edit Profile
    `;

    editBtn.classList.remove(
        'btn-success'
    );

    editBtn.classList.add(
        'btn-primary'
    );

    cancelBtn.classList.add(
        'd-none'
    );
});

showPasswordBtn.addEventListener(
    'click',
    function () {

        passwordSection.classList.remove(
            'd-none'
        );

        showPasswordBtn.classList.add(
            'd-none'
        );

        currentPasswordInput.focus();

    }
);

cancelPasswordBtn.addEventListener(
    'click',
    function () {

        passwordSection.classList.add(
            'd-none'
        );

        showPasswordBtn.classList.remove(
            'd-none'
        );

        currentPasswordInput.value = '';

        newPasswordInput.value = '';

        confirmPasswordInput.value = '';

        clearPasswordErrors();

    }
);

let passwordRegex =/^(?=.*[@#$%&*!])[A-Za-z0-9@#$%&*!]{8,}$/;

changePasswordBtn.addEventListener(
    'click',
    function () {

        clearPasswordErrors();

        let valid = true;

        let currentPassword =
            currentPasswordInput.value.trim();

        let newPassword =
            newPasswordInput.value.trim();

        let confirmPassword =
            confirmPasswordInput.value.trim();

        if (currentPassword === '') {

            showPasswordError(
                'currentPasswordError',
                'Current Password is required'
            );

            valid = false;

        } else if (
            currentPassword !==
            loginedUser.password
        ) {

            showPasswordError(
                'currentPasswordError',
                'Current Password is incorrect'
            );

            valid = false;
        }

        if (newPassword === '') {

            showPasswordError(
                'newPasswordError',
                'New Password is required'
            );

            valid = false;

        } else if (
            !passwordRegex.test(newPassword)
        ) {

            showPasswordError(
                'newPasswordError',
                'Password must be at least 8 characters and contain a special character'
            );

            valid = false;

        } else if (
            newPassword === currentPassword
        ) {

            showPasswordError(
                'newPasswordError',
                'New password must be different from current password'
            );

            valid = false;
        }

        if (confirmPassword === '') {

            showPasswordError(
                'confirmPasswordError',
                'Please confirm your password'
            );

            valid = false;

        } else if (
            newPassword !== confirmPassword
        ) {

            showPasswordError(
                'confirmPasswordError',
                'Passwords do not match'
            );

            valid = false;
        }

        if (!valid) {
            return;
        }

        let userIndex =
            users.findIndex(
                user =>
                    user.email ===
                    loginedUser.email
            );

        if (userIndex === -1) {

            alert('User not found');

            return;
        }

        users[userIndex].password =
            newPassword;

        localStorage.setItem(
            'users',
            JSON.stringify(users)
        );

        loginedUser =
            users[userIndex];

        updateLoginedUser(
            loginedUser
        );

        currentPasswordInput.value = '';

        newPasswordInput.value = '';

        confirmPasswordInput.value = '';

        passwordSection.classList.add(
            'd-none'
        );

        showPasswordBtn.classList.remove(
            'd-none'
        );

        alert(
            'Password changed successfully'
        );
    }
);

toggleCurrentPassword.addEventListener(
    'click',
    function () {

        if (
            currentPasswordInput.type ===
            'password'
        ) {

            currentPasswordInput.type =
                'text';

            toggleCurrentPassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            currentPasswordInput.type =
                'password';

            toggleCurrentPassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';
        }
    }
);

toggleNewPassword.addEventListener(
    'click',
    function () {

        if (
            newPasswordInput.type ===
            'password'
        ) {

            newPasswordInput.type =
                'text';

            toggleNewPassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            newPasswordInput.type =
                'password';

            toggleNewPassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';
        }
    }
);

toggleConfirmPassword.addEventListener(
    'click',
    function () {

        if (
            confirmPasswordInput.type ===
            'password'
        ) {

            confirmPasswordInput.type =
                'text';

            toggleConfirmPassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            confirmPasswordInput.type =
                'password';

            toggleConfirmPassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';
        }
    }
);

changeImageBtn.addEventListener(
    'click',
    function () {

        imageInput.click();

    }
);

imageInput.addEventListener(
    'change',
    function () {

        let file =
            imageInput.files[0];

        if (!file) {
            return;
        }

        if (
            !file.type.startsWith('image/')
        ) {

            alert(
                'Please select an image'
            );

            return;
        }

        let reader =
            new FileReader();

        reader.onload =
            function (e) {

                profileImage.src =
                    e.target.result;

                loginedUser.image =
                    e.target.result;

            };

        reader.readAsDataURL(file);

    }
);

function updateLoginedUser(user) {

    let cookieUser =
        getCookie('loginedUser');

    if (cookieUser) {

        let date =
            new Date();

        date.setMonth(
            date.getMonth() + 6
        );

        document.cookie =
            `loginedUser=${encodeURIComponent(
                JSON.stringify(user)
            )}; expires=${date.toUTCString()}; path=/`;

    }

    let sessionUser =
        sessionStorage.getItem(
            'loginedUser'
        );

    if (sessionUser) {

        sessionStorage.setItem(
            'loginedUser',
            JSON.stringify(user)
        );

    }
}

function showError(
    elementId,
    message
) {

    let element =
        document.getElementById(
            elementId
        );

    element.innerHTML = `
        <div class="profile-error">
            ${message}
        </div>
    `;
}

function clearProfileErrors() {

    document.getElementById(
        'fullNameError'
    ).innerHTML = '';

}

function showPasswordError(
    elementId,
    message
) {

    let element =
        document.getElementById(
            elementId
        );

    element.innerHTML = `
        <div class="password-error">
            ${message}
        </div>
    `;
}

function clearPasswordErrors() {

    document.getElementById(
        'currentPasswordError'
    ).innerHTML = '';

    document.getElementById(
        'newPasswordError'
    ).innerHTML = '';

    document.getElementById(
        'confirmPasswordError'
    ).innerHTML = '';
}
deleteAccountBtn.addEventListener(
    'click',
    function () {

        let confirmDelete = confirm(
            'Are you sure you want to delete your account? This action cannot be undone.'
        );

        if (!confirmDelete) {
            return;
        }

        let userIndex =
            users.findIndex(
                user =>
                    user.email ===
                    loginedUser.email
            );

        if (userIndex === -1) {

            alert('User not found');

            return;
        }

        users.splice(userIndex, 1);

        localStorage.setItem(
            'users',
            JSON.stringify(users)
        );

        sessionStorage.removeItem(
            'loginedUser'
        );

        document.cookie =
            'loginedUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

        localStorage.removeItem(
            'registerdUser'
        );

        window.open(
            '../html/login.html',
            '_self'
        );
    }
);

let loggedUser = null;

let sessionUser =
    sessionStorage.getItem("loginedUser");

if (sessionUser) {

    loggedUser = JSON.parse(sessionUser);

}

if (!loggedUser) {

    let cookies =
        document.cookie.split("; ");

    let userCookie =
        cookies.find(function(row) {

            return row.startsWith("loginedUser=");

        });


    if (userCookie) {

        loggedUser =
            JSON.parse(
                decodeURIComponent(
                    userCookie
                        .split("=")
                        .slice(1)
                        .join("=")
                )
            );

    }

}

let bookingsContainer =
    document.getElementById(
        "bookingsContainer"
    );

function displayBookings() {

    bookingsContainer.innerHTML = "";


    if (!loggedUser) {

        bookingsContainer.innerHTML = `

            <div class="col-12">

                <div class="empty-bookings">

                    <i class="fa-solid fa-user-lock"></i>

                    <h4>Please Login</h4>

                    <p>
                        Login to view your bookings.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    if (
        !loggedUser.bookings ||
        Object.keys(loggedUser.bookings).length === 0
    ) {

        bookingsContainer.innerHTML = `

            <div class="col-12">

                <div class="empty-bookings">

                    <i class="fa-solid fa-plane-departure"></i>

                    <h4>No Bookings Yet</h4>

                    <p>
                        You haven't booked any trips yet.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    Object.values(loggedUser.bookings).forEach(
        function (booking) {

            let statusClass = "status-pending";

            let statusIcon =
                "fa-clock";


            if (booking.status === "confirmed") {

                statusClass = "status-confirmed";

                statusIcon =
                    "fa-circle-check";

            }


            if (booking.status === "cancelled") {

                statusClass = "status-cancelled";

                statusIcon =
                    "fa-circle-xmark";

            }


            bookingsContainer.innerHTML += `

                <div class="col-lg-6 col-12">

                    <div class="booking-card">

                        <!-- HEADER -->

                        <div class="booking-header">

                            <div>

                                <h4>
                                    ${booking.destination}
                                </h4>

                                <span class="booking-country">

                                    <i class="fa-solid fa-location-dot"></i>

                                    ${booking.country}

                                </span>

                            </div>


                            <span class="booking-status ${statusClass}">

                                <i class="fa-solid ${statusIcon}"></i>

                                ${booking.status || "pending"}

                            </span>

                        </div>


                        <!-- DIVIDER -->

                        <div class="booking-divider"></div>


                        <!-- DETAILS -->

                        <div class="booking-details">

                            <div class="booking-detail">

                                <div class="detail-icon">

                                    <i class="fa-regular fa-calendar"></i>

                                </div>

                                <div>

                                    <span>
                                        Travel Date
                                    </span>

                                    <strong>
                                        ${booking.travelDate}
                                    </strong>

                                </div>

                            </div>


                            <div class="booking-detail">

                                <div class="detail-icon">

                                    <i class="fa-solid fa-users"></i>

                                </div>

                                <div>

                                    <span>
                                        Travelers
                                    </span>

                                    <strong>
                                        ${booking.travelers}
                                    </strong>

                                </div>

                            </div>


                            <div class="booking-detail">

                                <div class="detail-icon">

                                    <i class="fa-solid fa-tag"></i>

                                </div>

                                <div>

                                    <span>
                                        Price / Person
                                    </span>

                                    <strong>
                                        $${booking.price}
                                    </strong>

                                </div>

                            </div>


                            <div class="booking-detail">

                                <div class="detail-icon">

                                    <i class="fa-solid fa-wallet"></i>

                                </div>

                                <div>

                                    <span>
                                        Total Price
                                    </span>

                                    <strong class="total-price">
                                        $${booking.totalPrice}
                                    </strong>

                                </div>

                            </div>

                        </div>


                        <!-- FOOTER -->

                        <div class="booking-footer">

                            <span>

                                <i class="fa-solid fa-ticket"></i>

                                Booking #${booking.bookingId}

                            </span>

                        </div>

                    </div>

                </div>

            `;

        }
    );

}
displayBookings();