import { User } from "./Users.js"
let inputs = document.querySelectorAll('input')
let fullName = document.getElementById('exampleInputFullname1')
let email = document.getElementById('exampleInputEmail1')
let phoneNumber = document.getElementById('exampleInputPhone1')
let password = document.getElementById('exampleInputPassword1')
let confirmedPassword = document.getElementById('exampleInputPassword2')
let tooglePassword = document.getElementById('togglePassword')
let form = document.querySelector('form')
let toogleConfirmedPassword = document.getElementById('togglePassword2')
let formDivs = document.querySelectorAll('form div.mb-2')
console.log(formDivs);

var error

let fullNameRegex = /^[a-zA-Z]{3,12}( [a-zA-Z]{3,12}){1,3}$/
let emailRegex = /^[a-zA-Z0-9._%+-]{5,}@gmail\.com$/;
let phoneRegex = /^01(1|0|2|5)[0-9]{8}$/
let passwordRegex = /^(?=.*[@#$%&*!])[A-Za-z0-9@#$%&*!]{8,}$/;


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

// inputs.forEach(input => {
//      if(input.required)
//         input.required='true'
//     else{
//         input.setAttribute('required','true')
//     }
// });
form.addEventListener('submit', async function (e) {
    let valid = true
    let userExsists = false
    e.preventDefault()
    let admin
    try {
        let response = await fetch('../admin.json')
        admin = await response.json()
        console.log(admin);

    } catch (error) {
        console.log(error);

    }
    if (!fullNameRegex.test(fullName.value.trim())) {
        let oldErrorName = document.querySelector('.fullname-error')
        if (oldErrorName) {
            oldErrorName.remove()
        }
        valid = false;
        fullName.focus()
        fullName.classList.add('is-invalid')
        let div = formDivs[0]
        if (fullName.value.trim() === '')
            error = 'full name is required';
        else {
            error = 'Full name must contain letters only and each name must be at least 3 letters '
        }
        let newDiv = document.createElement('div');
        newDiv.classList.add('fullname-error')
        newDiv.innerHTML = `<div id="emailHelp" class="form-text">${error}</div>`
        div.appendChild(newDiv)
    }
    else if (!emailRegex.test(email.value.trim())) {
        let oldError = document.querySelector('.email-error')
        if (oldError) {
            oldError.remove()
        }
        valid = false
        email.focus()
        let div = formDivs[1]
        if (email.value.trim() === '')
            error = 'email is required';
        else {
            error = 'Please enter a valid email address ex.user12@gmail.com'
        }
        let newDiv = document.createElement('div');
        newDiv.classList.add('email-error')
        newDiv.innerHTML = `<div id="emailHelp" class="form-text">${error}</div>`
        div.appendChild(newDiv)
        valid = false;
        email.focus()
    }
    else if (!phoneRegex.test(phoneNumber.value.trim())) {
        let oldError = document.querySelector('.phone-error')
        if (oldError) {
            oldError.remove()
        }
        valid = false;
        phoneNumber.classList.add('is-invalid')
        phoneNumber.focus()
        let div = formDivs[2]
        if (phoneNumber.value.trim() === '')
            error = 'Phone Number is required';
        else {
            error = 'Please enter a valid Phone address 010|011|012|015'
        }
        let newDiv = document.createElement('div');
        newDiv.classList.add('phone-error')
        newDiv.innerHTML = `<div id="emailHelp" class="form-text">${error}</div>`
        div.appendChild(newDiv)
    }

    else if (!passwordRegex.test(password.value.trim())) {
        let oldError = document.querySelector('.password-error')
        if (oldError) {
            oldError.remove()
        }
        valid = false;
        password.classList.add('is-invalid')
        password.focus()
        let div = formDivs[3]
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
        let div = formDivs[4]
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
            userExsists = Users.some(user => user.email === email.value.trim())
            if (userExsists || email.value.trim() === admin[0].email) {
                let oldError = document.querySelector('.email-error')
                if (oldError) {
                    oldError.remove()
                }
                email.focus()
                let div = formDivs[1]
                error = 'Email is already registered. Please login.'
                let newDiv = document.createElement('div');
                newDiv.classList.add('email-error')
                newDiv.innerHTML = `<div id="emailHelp" class="form-text">${error}</div>`
                div.appendChild(newDiv)
                valid = false;
                email.focus()
                return;
            }
        }

        let registerdUser = new User(fullName.value, email.value, password.value, phoneNumber.value)
        Users.push(registerdUser)
        localStorage.setItem('users', JSON.stringify(Users))
        localStorage.setItem('registerdUser', JSON.stringify(registerdUser))
        // console.log(registerdUser);
        // console.log(Users);
        let width = window.innerWidth
        let height = window.innerHeight
        window.open('../html/login.html', '_self', `width=${width},height=${height}`)


    }

})
fullName.addEventListener('input', function () {
    let oldErrorName = document.querySelector('.fullname-error')
    if (oldErrorName) {
        oldErrorName.remove()
    }
    if (!fullNameRegex.test(fullName.value.trim())) {
        fullName.classList.add('is-invalid')
        let div = formDivs[0]
        if (fullName.value.trim() === '')
            error = 'full name is required';
        else {
            error = 'Full name must contain letters only and each name must be at least 3 letters '
        }
        let newDiv = document.createElement('div');
        newDiv.classList.add('fullname-error')
        newDiv.innerHTML = `<div id="emailHelp" class="form-text">${error}</div>`
        div.appendChild(newDiv)
    }
    else {
        fullName.classList.remove('is-invalid')
    }
})
email.addEventListener('input', function () {
    let oldError = document.querySelector('.email-error')
    if (oldError) {
        oldError.remove()
    }
    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('is-invalid')
        let div = formDivs[1]
        if (email.value.trim() === '')
            error = 'email is required';
        else {
            error = 'Please enter a valid email address ex.user12@gmail.com'
        }
        let newDiv = document.createElement('div');
        newDiv.classList.add('email-error')
        newDiv.innerHTML = `<div id="emailHelp" class="form-text">${error}</div>`
        div.appendChild(newDiv)
    }
    else {
        email.classList.remove('is-invalid')
    }
})
phoneNumber.addEventListener('input', function () {
    let oldError = document.querySelector('.phone-error')
    if (oldError) {
        oldError.remove()
    }
    if (!phoneRegex.test(phoneNumber.value.trim())) {
        phoneNumber.classList.add('is-invalid')
        let div = formDivs[2]
        if (phoneNumber.value.trim() === '')
            error = 'Phone Number is required';
        else {
            error = 'Please enter a valid Phone address 010|011|012|015'
        }
        let newDiv = document.createElement('div');
        newDiv.classList.add('phone-error')
        newDiv.innerHTML = `<div id="emailHelp" class="form-text">${error}</div>`
        div.appendChild(newDiv)
    }
    else {
        phoneNumber.classList.remove('is-invalid')
    }
})

password.addEventListener('input', function () {
    let oldError = document.querySelector('.password-error')
    if (oldError) {
        oldError.remove()
    }
    if (!passwordRegex.test(password.value.trim())) {
        password.classList.add('is-invalid')
        let div = formDivs[3]
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
        let div = formDivs[4]
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