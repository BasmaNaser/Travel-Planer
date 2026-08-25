let form = document.querySelector('form')
let email = document.getElementById('floatingInput')
let formDiv= document.querySelector('.form-floating')
let button = document.querySelector('button')
email.required = 'false'
let emailRegex = /^[a-zA-Z0-9._%-]{8,}@gmail\.com$/;
form.addEventListener('submit',function(e){
    e.preventDefault()
    let emailValue= email.value.trim()
    let oldError = document.querySelector('.email-error')
        if (oldError) {
            oldError.remove()
        }
    if(!emailRegex.test(emailValue))
    {
        let oldError = document.querySelector('.email-error')
        if (oldError) {
            oldError.remove()
        }
        let error 
        if(emailValue==='')
        {
            error = 'Email Is Required '
        }
        else {
            error = 'Please enter a valid email address ex.user12@gmail.com'
        }
        let newDiv= document.createElement('div')
        newDiv.classList.add('email-error');
        newDiv.innerHTML=`<div id="emailHelp" class="form-text">${error}</div>`
        formDiv.appendChild(newDiv)
        email.focus()
    }
    else{
        let users = JSON.parse(localStorage.getItem('users'))
        let userEmail = users.find(user=> user.email===emailValue)
        if(!userEmail)
        {
            button.innerHTML=`Send Reset Link <i
                            class="fa-solid fa-spinner fa-spin"></i>`
        }
        else{
             button.innerHTML=`Send Reset Link <i
                            class="fa-solid fa-spinner fa-spin"></i>`
            setTimeout(() => {
                let date = new Date()
            date.setMinutes(date.getMinutes()+15)
            document.cookie=`emailToResetPassword=${emailValue};expires=${date.toUTCString()};path=/`
            let width = window.innerWidth
            let height = window.innerHeight
            window.open('../html/createNewPassword.html','_self')
            }, 3000);
            
        }
    }
})
function getCookie(name)
{
    let cookies=document.cookie
    
    for (const cookie of cookies) {
        
    }
}