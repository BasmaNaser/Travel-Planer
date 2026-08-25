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

fetch('../data.json').
then(response=>response.json())
.then(data=>{
    data.trending.forEach(travel => {
        let div =`<div class="card m-3" style="width: 25rem;">
                    <img class="card-img-top" src='../${travel.image}' alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title fs-4">${travel.name}</h5>
                        <p class="card-text text-secondary">${travel.description}</p>
                        <div class="d-flex justify-content-between">
                            <h3 style="color:#0ea5a8;">${travel.price}$</h3>
                        <button href="#" class="btn" onclick="window.open('../html/destination.html','_self')">Go somewhere</button>
                        </div>
                    </div>
                </div>`
        myDiv.innerHTML+=div
    });
}
)
.catch(error=>console.log(error)
)

