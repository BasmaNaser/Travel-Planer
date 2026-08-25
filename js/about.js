
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


const counters = document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let count = 0;

        const increment = target / 100;

        const updateCounter = () => {

            count += increment;

            if(count < target){

                counter.innerText = Math.floor(count);

                requestAnimationFrame(updateCounter);

            }else{

                if(target === 50000){

                    counter.innerText = "50K+";

                }else if(target === 10000){

                    counter.innerText = "10K+";

                }else if(target === 49){

                    counter.innerText = "4.9★";

                }else{

                    counter.innerText = target + "+";
                }
            }
        };

        updateCounter();

    });

};

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            startCounter();

            observer.disconnect();

        }

    });

});

observer.observe(document.querySelector(".stats"));