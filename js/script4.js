let password = document.getElementById('floatingPassword')
let confirmedPassword = document.getElementById('floatingConfirmPassword')
let form = document.querySelector('form')
let toogleConfirmedPassword = document.getElementById('toggleConfirmPassword')
let tooglePassword = document.getElementById('togglePassword')
let formDivs = document.querySelectorAll('.form-floating')
let button = document.querySelector('button')
let emailValue = ''

let passwordRegex = /^(?=.*[@#$%&*!])[A-Za-z0-9@#$%&*!]{8,}$/;
console.log(document.cookie);

let cookies = document.cookie.split('; ');

let emailCookie = cookies.find(cookie =>
    cookie.startsWith('emailToResetPassword=')
);

if (emailCookie) {

    let [emailKey, email] = emailCookie.split('=');

    console.log(emailKey, email);
    emailValue = email

} else {

    window.open('../html/errorpage.html', '_self');

}
tooglePassword.addEventListener('click', function () {
    if (password.type == 'password') {
        password.type = 'text';
        tooglePassword.classList.replace('fa-eye', 'fa-eye-slash')
    }
    else {
        password.type = 'password';
        tooglePassword.classList.replace('fa-eye-slash', 'fa-eye')
    }
})

toogleConfirmedPassword.addEventListener('click', function () {
    if (confirmedPassword.type == 'password') {
        confirmedPassword.type = 'text';
        toogleConfirmedPassword.classList.replace('fa-eye', 'fa-eye-slash')
    }
    else {
        confirmedPassword.type = 'password';
        toogleConfirmedPassword.classList.replace('fa-eye-slash', 'fa-eye')
    }
})

form.addEventListener('submit', function (e) {
    e.preventDefault()
    let emailCookie = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('emailToResetPassword='));

    if (!emailCookie) {
        setTimeout(() => {
            window.location.replace('../html/errorpage.html');
        }, 2000);
        return;
    }
    if (!passwordRegex.test(password.value.trim())) {
        let oldError = document.querySelector('.password-error')
        if (oldError) {
            oldError.remove()
        }
        valid = false;
        password.classList.add('is-invalid')
        password.focus()
        let div = formDivs[0]
        if (password.value.trim() === '')
            error = 'Password is required';
        else {
            error = 'Password must be at least 8 characters and contain a special character'
        }
        let newDiv = document.createElement('div');
        newDiv.classList.add('password-error')
        newDiv.innerHTML = `<div id="emailHelp" class="form-text">${error}</div>`
        div.appendChild(newDiv)
    }

    else if (password.value !== confirmedPassword.value) {
        let oldError = document.querySelector('.confirmedPassword-error')
        if (oldError) {
            oldError.remove()
        }
        valid = false;
        confirmedPassword.classList.add('is-invalid')
        confirmedPassword.focus()
        let div = formDivs[1]
        if (confirmedPassword.value.trim() === '')
            error = 'Please confirm your password';
        else {
            error = 'Passwords do not match'
        }
        let newDiv = document.createElement('div');
        newDiv.classList.add('confirmedPassword-error')
        newDiv.innerHTML = `<div id="emailHelp" class="form-text">${error}</div>`
        div.appendChild(newDiv)
    }
    else {
        let Users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        if (Users) {
            let userIndex = Users.findIndex(user => user.email === emailValue)
            if (userIndex === -1) {
                setTimeout(() => {
                    window.location.replace('../html/errorpage.html', '_self')
                }, 2000);

                button.innerHTML = `Reset Password <i
                            class="fa-solid fa-spinner fa-spin"></i>`
                return;
            }
            else {

                let registerUser = { email: Users[userIndex].email, password: password.value.trim() }
                Users[userIndex].password = password.value.trim()
                localStorage.setItem('registerdUser', JSON.stringify(registerUser))
                localStorage.setItem('users', JSON.stringify(Users))
                document.cookie = 'emailToResetPassword=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                setTimeout(() => {
                    window.location.replace('../html/ResetPasswordSuccessfuly.html', '_self')
                }, 3000);
                button.innerHTML = `Reset Password <i
                            class="fa-solid fa-spinner fa-spin"></i>`

            }
        }
        else {
            setTimeout(() => {
                window.location.replace('../html/errorpage.html', '_self')
            }, 2000);
            button.innerHTML = `Reset Password <i
                            class="fa-solid fa-spinner fa-spin"></i>`
            return;
        }
    }


})


password.addEventListener('input', function () {
    let oldError = document.querySelector('.password-error')
    if (oldError) {
        oldError.remove()
    }
    if (!passwordRegex.test(password.value.trim())) {
        password.classList.add('is-invalid')
        let div = formDivs[0]
        if (password.value.trim() === '')
            error = 'Password is required';
        else {
            error = 'Password must be at least 8 characters and contain a special character'
        }
        let newDiv = document.createElement('div');
        newDiv.classList.add('password-error')
        newDiv.innerHTML = `<div id="emailHelp" class="form-text">${error}</div>`
        div.appendChild(newDiv)
    }
    else {
        password.classList.remove('is-invalid')
    }

})

confirmedPassword.addEventListener('input', function () {
    let oldError = document.querySelector('.confirmedPassword-error')
    if (oldError) {
        oldError.remove()
    }
    if (password.value !== confirmedPassword.value) {
        confirmedPassword.classList.add('is-invalid')
        let div = formDivs[1]
        if (confirmedPassword.value.trim() === '')
            error = 'Please confirm your password';
        else {
            error = 'Passwords do not match'
        }
        let newDiv = document.createElement('div');
        newDiv.classList.add('confirmedPassword-error')
        newDiv.innerHTML = `<div id="emailHelp" class="form-text">${error}</div>`
        div.appendChild(newDiv)
    }
    else {
        confirmedPassword.classList.remove('is-invalid')
    }
})

