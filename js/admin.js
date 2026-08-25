// =====================================
// CHECK ADMIN
// =====================================


let myDiv = document.getElementById('myDiv')

let registerdUserlocal = JSON.parse(localStorage.getItem('admin'))
let registerdUsersession = JSON.parse(sessionStorage.getItem('admin'))
let myBtn=document.getElementById('mylogin')
console.log(myBtn.classList.add("btn-danger"));

if(registerdUserlocal||registerdUsersession){
    myBtn.innerHTML='Logout'
}
else
{
    myBtn.innerHTML='Login'
    
}
myBtn.onclick = function(){

    if (registerdUserlocal) {
        localStorage.removeItem('admin')
    }

    if (registerdUsersession) {
        sessionStorage.removeItem('admin')
    }

    window.location.href = '../html/login.html'
}

let admin =
    JSON.parse(localStorage.getItem("admin")) ||
    JSON.parse(sessionStorage.getItem("admin"));


// لو مش Admin ممنوع يدخل Dashboard
if (!admin) {
    window.location.href = "login.html";
}


// =====================================
// GET USERS
// =====================================

let users =
    JSON.parse(localStorage.getItem("users")) || [];


// =====================================
// GET CARDS
// =====================================

let adminCards =
    JSON.parse(localStorage.getItem("adminCards")) || [];


// =====================================
// ELEMENTS
// =====================================

let totalUsers =
    document.getElementById("totalUsers");

let usersTable =
    document.getElementById("usersTable");


// =====================================
// SHOW USERS
// =====================================

function showUsers() {

    usersTable.innerHTML = "";

    // Total Users
    totalUsers.innerText = users.length;


    users.forEach(function(user, index) {

        usersTable.innerHTML += `

            <tr>

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${user.name || ""}
                </td>

                <td>
                    ${user.email || ""}
                </td>

                <td>
                    ${user.phone || ""}
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
// DELETE USER
// =====================================

window.deleteUser = function(index) {

    Swal.fire({

        title: "Delete User?",

        text: "Are you sure you want to delete this user?",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Yes, delete",

        cancelButtonText: "Cancel",

        confirmButtonColor: "#dc3545"

    }).then(function(result) {

        if (result.isConfirmed) {

            // Delete user from array
            users.splice(index, 1);


            // Save users again
            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );


            // Update table
            showUsers();


            Swal.fire({

                icon: "success",

                title: "Deleted!",

                text: "User has been deleted.",

                timer: 1500,

                showConfirmButton: false

            });

        }

    });

};


// =====================================
// TOTAL CARDS
// =====================================

let totalTrips =
    document.getElementById("totalTrips");

if (totalTrips) {

    totalTrips.innerText =
        adminCards.length;

}


// =====================================
// LOGOUT ADMIN
// =====================================

let logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.onclick = function() {

        // IMPORTANT:
        // Remove ADMIN login only

        localStorage.removeItem("admin");

        sessionStorage.removeItem("admin");


        // DON'T USE:
        // localStorage.clear();


        window.location.href = "home.html";

    };

}


// =====================================
// START
// =====================================

showUsers();