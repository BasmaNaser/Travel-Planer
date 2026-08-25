let profileImage=document.getElementById('profileImage');
let changeImageBtn=document.getElementById('changeImageBtn');
let imageInput=document.getElementById('imageInput');
let deleteAccountBtn=document.getElementById('deleteAccountBtn');
let fullNameInput=document.getElementById('fullName');
let emailInput=document.getElementById('email');
let genderInput=document.getElementById('gender');
let aboutInput=document.getElementById('about');
let editBtn=document.getElementById('editBtn');
let cancelBtn=document.getElementById('cancelBtn');
let showPasswordBtn=document.getElementById('showPasswordBtn');
let passwordSection=document.getElementById('passwordSection');
let currentPasswordInput=document.getElementById('currentPassword');
let newPasswordInput=document.getElementById('newPassword');
let confirmPasswordInput=document.getElementById('confirmPassword');
let toggleCurrentPassword=document.getElementById('toggleCurrentPassword');
let toggleNewPassword=document.getElementById('toggleNewPassword');
let toggleConfirmPassword=document.getElementById('toggleConfirmPassword');
let changePasswordBtn=document.getElementById('changePasswordBtn');
let cancelPasswordBtn=document.getElementById('cancelPasswordBtn');
let myDiv=document.getElementById('myDiv');

let registerdUserlocal=JSON.parse(localStorage.getItem('loginedUser'));
let registerdUsersession=JSON.parse(sessionStorage.getItem('loginedUser'));
let registerdUserCookie=null;

let userCookie=document.cookie.split('; ').find(function(cookie){
    return cookie.startsWith('loginedUser=');
});

if(userCookie){
    registerdUserCookie=JSON.parse(
        decodeURIComponent(
            userCookie.split('=').slice(1).join('=')
        )
    );
}

let myBtn=document.getElementById('mylogin');
let myProfile=document.getElementById('myprofile');

if(registerdUserlocal||registerdUsersession||registerdUserCookie){
    myBtn.innerHTML='Logout';
    myBtn.classList.add('btn-danger');
    myProfile.classList.remove('d-none');
}else{
    myBtn.innerHTML='Login';
    myBtn.classList.remove('btn-danger');
    myBtn.style.border='1px solid #0ea5a8';
    myProfile.classList.add('d-none');
}

myBtn.onclick=function(){
    localStorage.removeItem('loginedUser');
    sessionStorage.removeItem('loginedUser');

    if(registerdUserCookie){
        document.cookie='loginedUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    }

    window.location.href='../html/login.html';
};

myProfile.addEventListener('click',function(){
    if(registerdUserlocal||registerdUsersession||registerdUserCookie){
        window.open('../html/profile.html','_self');
    }
});

let users=JSON.parse(localStorage.getItem('users'))||[];
let loginedUser=null;
let isEditing=false;

function getCookie(name){
    let cookies=document.cookie.split(';');

    for(let cookie of cookies){
        cookie=cookie.trim();

        if(cookie.startsWith(name+'=')){
            return cookie.substring(name.length+1);
        }
    }

    return null;
}

let cookieUser=getCookie('loginedUser');

if(cookieUser){
    try{
        loginedUser=JSON.parse(decodeURIComponent(cookieUser));
    }catch(error){
        console.log('Cookie error:',error);
        window.open('../html/errorpage.html','_self');
    }
}

if(!loginedUser){
    let sessionUser=sessionStorage.getItem('loginedUser');

    if(sessionUser){
        try{
            loginedUser=JSON.parse(sessionUser);
        }catch(error){
            console.log('Session error:',error);
            window.open('../html/errorpage.html','_self');
        }
    }
}

if(!loginedUser){
    window.open('../html/errorpage.html','_self');
}

let defaultImage='../imgs/avatar.webp';

if(loginedUser){
    fullNameInput.value=loginedUser.name||'';
    emailInput.value=loginedUser.email||'';
    genderInput.value=loginedUser.gender||'';
    aboutInput.value=loginedUser.about||'';

    profileImage.src=loginedUser.image||defaultImage;
}

function setProfileInputs(enabled){
    fullNameInput.disabled=!enabled;
    genderInput.disabled=!enabled;
    aboutInput.disabled=!enabled;
    emailInput.disabled=true;
    changeImageBtn.disabled=!enabled;
}

editBtn.addEventListener('click',function(){
    if(!isEditing){
        isEditing=true;
        setProfileInputs(true);

        editBtn.innerHTML='<i class="fa-solid fa-check"></i> Save Changes';
        editBtn.classList.remove('btn-primary');
        editBtn.classList.add('btn-success');
        cancelBtn.classList.remove('d-none');

        fullNameInput.focus();
    }else{
        saveProfile();
    }
});

function saveProfile(){
    clearProfileErrors();

    let valid=true;
    let fullName=fullNameInput.value.trim();
    let fullNameRegex=/^[a-zA-Z]{3,12}( [a-zA-Z]{3,12}){1,3}$/;

    if(fullName===''){
        showError('fullNameError','Full Name is required');
        valid=false;
    }else if(!fullNameRegex.test(fullName)){
        showError('fullNameError','Full Name must contain letters only');
        valid=false;
    }

    if(!valid)return;

    let userIndex=users.findIndex(function(user){
        return user.email===loginedUser.email;
    });

    if(userIndex===-1){
        alert('User not found');
        return;
    }

    users[userIndex].name=fullName;
    users[userIndex].gender=genderInput.value;
    users[userIndex].about=aboutInput.value.trim();

    if(loginedUser.image){
        users[userIndex].image=loginedUser.image;
    }

    loginedUser=users[userIndex];

    localStorage.setItem('users',JSON.stringify(users));
    updateLoginedUser(loginedUser);

    setProfileInputs(false);
    isEditing=false;

    editBtn.innerHTML='<i class="fa-solid fa-pen-to-square"></i> Edit Profile';
    editBtn.classList.remove('btn-success');
    editBtn.classList.add('btn-primary');
    cancelBtn.classList.add('d-none');

    alert('Profile updated successfully');
}

cancelBtn.addEventListener('click',function(){
    fullNameInput.value=loginedUser.name||'';
    genderInput.value=loginedUser.gender||'';
    aboutInput.value=loginedUser.about||'';

    profileImage.src=loginedUser.image||defaultImage;

    clearProfileErrors();
    setProfileInputs(false);

    isEditing=false;

    editBtn.innerHTML='<i class="fa-solid fa-pen-to-square"></i> Edit Profile';
    editBtn.classList.remove('btn-success');
    editBtn.classList.add('btn-primary');
    cancelBtn.classList.add('d-none');
});

showPasswordBtn.addEventListener('click',function(){
    passwordSection.classList.remove('d-none');
    showPasswordBtn.classList.add('d-none');
    currentPasswordInput.focus();
});

cancelPasswordBtn.addEventListener('click',function(){
    passwordSection.classList.add('d-none');
    showPasswordBtn.classList.remove('d-none');

    currentPasswordInput.value='';
    newPasswordInput.value='';
    confirmPasswordInput.value='';

    clearPasswordErrors();
});

let passwordRegex=/^(?=.*[@#$%&*!])[A-Za-z0-9@#$%&*!]{8,}$/;

changePasswordBtn.addEventListener('click',function(){
    clearPasswordErrors();

    let valid=true;

    let currentPassword=currentPasswordInput.value.trim();
    let newPassword=newPasswordInput.value.trim();
    let confirmPassword=confirmPasswordInput.value.trim();

    if(currentPassword===''){
        showPasswordError('currentPasswordError','Current Password is required');
        valid=false;
    }else if(currentPassword!==loginedUser.password){
        showPasswordError('currentPasswordError','Current Password is incorrect');
        valid=false;
    }

    if(newPassword===''){
        showPasswordError('newPasswordError','New Password is required');
        valid=false;
    }else if(!passwordRegex.test(newPassword)){
        showPasswordError('newPasswordError','Password must be at least 8 characters and contain a special character');
        valid=false;
    }else if(newPassword===currentPassword){
        showPasswordError('newPasswordError','New password must be different from current password');
        valid=false;
    }

    if(confirmPassword===''){
        showPasswordError('confirmPasswordError','Please confirm your password');
        valid=false;
    }else if(newPassword!==confirmPassword){
        showPasswordError('confirmPasswordError','Passwords do not match');
        valid=false;
    }

    if(!valid)return;

    let userIndex=users.findIndex(function(user){
        return user.email===loginedUser.email;
    });

    if(userIndex===-1){
        alert('User not found');
        return;
    }

    users[userIndex].password=newPassword;

    localStorage.setItem('users',JSON.stringify(users));

    loginedUser=users[userIndex];
    updateLoginedUser(loginedUser);

    currentPasswordInput.value='';
    newPasswordInput.value='';
    confirmPasswordInput.value='';

    passwordSection.classList.add('d-none');
    showPasswordBtn.classList.remove('d-none');

    alert('Password changed successfully');
});

toggleCurrentPassword.addEventListener('click',function(){
    currentPasswordInput.type=currentPasswordInput.type==='password'?'text':'password';
    toggleCurrentPassword.innerHTML=currentPasswordInput.type==='password'
        ?'<i class="fa-solid fa-eye"></i>'
        :'<i class="fa-solid fa-eye-slash"></i>';
});

toggleNewPassword.addEventListener('click',function(){
    newPasswordInput.type=newPasswordInput.type==='password'?'text':'password';
    toggleNewPassword.innerHTML=newPasswordInput.type==='password'
        ?'<i class="fa-solid fa-eye"></i>'
        :'<i class="fa-solid fa-eye-slash"></i>';
});

toggleConfirmPassword.addEventListener('click',function(){
    confirmPasswordInput.type=confirmPasswordInput.type==='password'?'text':'password';
    toggleConfirmPassword.innerHTML=confirmPasswordInput.type==='password'
        ?'<i class="fa-solid fa-eye"></i>'
        :'<i class="fa-solid fa-eye-slash"></i>';
});

changeImageBtn.addEventListener('click',function(){
    imageInput.click();
});

imageInput.addEventListener('change',function(){
    let file=imageInput.files[0];

    if(!file)return;

    if(!file.type.startsWith('image/')){
        alert('Please select an image');
        return;
    }

    let reader=new FileReader();

    reader.onload=function(e){
        profileImage.src=e.target.result;
        loginedUser.image=e.target.result;
    };

    reader.readAsDataURL(file);
});

function updateLoginedUser(user){
    let cookieUser=getCookie('loginedUser');

    if(cookieUser){
        let date=new Date();
        date.setMonth(date.getMonth()+6);

        document.cookie=`loginedUser=${encodeURIComponent(JSON.stringify(user))}; expires=${date.toUTCString()}; path=/`;
    }

    if(sessionStorage.getItem('loginedUser')){
        sessionStorage.setItem('loginedUser',JSON.stringify(user));
    }

    if(localStorage.getItem('loginedUser')){
        localStorage.setItem('loginedUser',JSON.stringify(user));
    }
}

function showError(elementId,message){
    let element=document.getElementById(elementId);

    element.innerHTML=`
        <div class="profile-error">${message}</div>
    `;
}

function clearProfileErrors(){
    document.getElementById('fullNameError').innerHTML='';
}

function showPasswordError(elementId,message){
    let element=document.getElementById(elementId);

    element.innerHTML=`
        <div class="password-error">${message}</div>
    `;
}

function clearPasswordErrors(){
    document.getElementById('currentPasswordError').innerHTML='';
    document.getElementById('newPasswordError').innerHTML='';
    document.getElementById('confirmPasswordError').innerHTML='';
}

deleteAccountBtn.addEventListener('click',function(){
    let confirmDelete=confirm('Are you sure you want to delete your account? This action cannot be undone.');

    if(!confirmDelete)return;

    let userIndex=users.findIndex(function(user){
        return user.email===loginedUser.email;
    });

    if(userIndex===-1){
        alert('User not found');
        return;
    }

    users.splice(userIndex,1);

    localStorage.setItem('users',JSON.stringify(users));

    let bookings=JSON.parse(localStorage.getItem('bookings'))||[];

    bookings=bookings.filter(function(booking){
        return booking.email!==loginedUser.email;
    });

    localStorage.setItem('bookings',JSON.stringify(bookings));

    localStorage.removeItem('loginedUser');
    sessionStorage.removeItem('loginedUser');

    document.cookie='loginedUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

    window.open('../html/login.html','_self');
});

let bookingsContainer=document.getElementById('bookingsContainer');

function displayBookings(){

    bookingsContainer.innerHTML='';

    let bookings=JSON.parse(localStorage.getItem('bookings'))||[];

    let userBookings=bookings.filter(function(booking){
        return booking.email===loginedUser.email;
    });

    if(userBookings.length===0){

        bookingsContainer.innerHTML=`
            <div class="col-12">
                <div class="empty-bookings">
                    <i class="fa-solid fa-plane-departure"></i>
                    <h4>No Bookings Yet</h4>
                    <p>You haven't booked any trips yet.</p>
                </div>
            </div>
        `;

        return;
    }

    userBookings.forEach(function(booking){

        let status=booking.status||'pending';

        let statusClass='status-pending';
        let statusIcon='fa-clock';

        if(status==='confirmed'){
            statusClass='status-confirmed';
            statusIcon='fa-circle-check';
        }

        if(status==='cancelled'){
            statusClass='status-cancelled';
            statusIcon='fa-circle-xmark';
        }

        bookingsContainer.innerHTML+=`
            <div class="col-lg-6 col-12">
                <div class="booking-card">
                    <div class="booking-header">
                        <div>
                            <h4>${booking.destination}</h4>
                            <span class="booking-country">
                                <i class="fa-solid fa-location-dot"></i>
                                ${booking.country||''}
                            </span>
                        </div>
                        <span class="booking-status ${statusClass}">
                            <i class="fa-solid ${statusIcon}"></i>
                            ${status}
                        </span>
                    </div>
                    <div class="booking-divider"></div>
                    <p><strong>Travel Date:</strong> ${booking.travelDate}</p>
                    <p><strong>Travelers:</strong> ${booking.travelers}</p>
                    <p><strong>Total Price:</strong> $${booking.totalPrice}</p>
                    <p><strong>Payment:</strong> ${booking.paymentStatus||'Paid'}</p>
                </div>
            </div>
        `;
    });
}

displayBookings();