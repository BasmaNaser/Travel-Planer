let myDiv = document.getElementById("myDiv");

let myBtn = document.getElementById("mylogin");

let usersTable = document.getElementById("usersTable");

let totalUsers = document.getElementById("totalUsers");

let totalBookings = document.getElementById("totalBookings");

let totalTrips = document.getElementById("totalTrips");

let logoutBtn = document.getElementById("logoutBtn");


// =====================================
// CHECK ADMIN
// =====================================

let registerdUserlocal =
    JSON.parse(localStorage.getItem("admin"));

let registerdUsersession =
    JSON.parse(sessionStorage.getItem("admin"));

let admin =
    registerdUserlocal ||
    registerdUsersession;


// =====================================
// LOGIN / LOGOUT BUTTON
// =====================================

if (registerdUserlocal || registerdUsersession) {

    myBtn.innerHTML = "Logout";

    myBtn.classList.add("btn-danger");

}
else {

    myBtn.innerHTML = "Login";

}


// =====================================
// LOGIN BUTTON
// =====================================

myBtn.onclick = function() {

    localStorage.removeItem("admin");

    sessionStorage.removeItem("admin");

    window.location.href =
        "../html/login.html";

};


// =====================================
// PROTECT ADMIN DASHBOARD
// =====================================

if (!admin) {

    window.location.href =
        "login.html";

}


// =====================================
// GET USERS
// =====================================

let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];


// =====================================
// GET BOOKINGS
// =====================================

let bookings =
    JSON.parse(
        localStorage.getItem("bookings")
    ) || [];


// =====================================
// GET ADMIN CARDS
// =====================================

let adminCards =
    JSON.parse(
        localStorage.getItem("adminCards")
    ) || [];


// =====================================
// SHOW USERS
// =====================================

function showUsers() {

    usersTable.innerHTML = "";

    totalUsers.innerText =
        users.length;


    if (users.length === 0) {

        usersTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center">

                    No users yet

                </td>

            </tr>

        `;

        return;

    }


    users.forEach(function(user, index) {

        usersTable.innerHTML += `

            <tr>

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${user.name || "-"}
                </td>

                <td>
                    ${user.email || "-"}
                </td>

                <td>
                    ${user.phone || "-"}
                </td>

                <td>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteUser(${index})">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}


// =====================================
// SHOW TOTAL BOOKINGS
// =====================================

function showTotalBookings() {

    totalBookings.innerText =
        bookings.length;

}


// =====================================
// SHOW TOTAL TRIPS
// =====================================

function showTotalTrips() {

    totalTrips.innerText =
        adminCards.length;

}


// =====================================
// DELETE USER
// =====================================

window.deleteUser =
    function(index) {

        Swal.fire({

            title: "Delete User?",

            text:
                "Are you sure you want to delete this user?",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText:
                "Yes, delete",

            cancelButtonText:
                "Cancel",

            confirmButtonColor:
                "#dc3545"

        }).then(function(result) {

            if (!result.isConfirmed) {

                return;

            }


            let deletedUser =
                users[index];


            // Delete user

            users.splice(index, 1);


            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );


            // Delete user's bookings

            bookings =
                bookings.filter(
                    function(booking) {

                        return booking.userId !==
                            deletedUser.id;

                    }
                );


            localStorage.setItem(
                "bookings",
                JSON.stringify(bookings)
            );


            // Update totals

            totalUsers.innerText =
                users.length;

            totalBookings.innerText =
                bookings.length;


            // Refresh users table

            showUsers();


            Swal.fire({

                icon: "success",

                title: "Deleted!",

                text:
                    "User and their bookings have been deleted.",

                timer: 1500,

                showConfirmButton: false

            });

        });

    };


// =====================================
// LOGOUT
// =====================================

if (logoutBtn) {

    logoutBtn.onclick =
        function() {

            localStorage.removeItem("admin");

            sessionStorage.removeItem("admin");

            window.location.href =
                "home.html";

        };

}


// =====================================
// START DASHBOARD
// =====================================

showUsers();

showTotalBookings();

showTotalTrips();