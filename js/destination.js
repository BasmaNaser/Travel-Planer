// =====================================
// CHECK ADMIN
// =====================================
let admin =
    JSON.parse(localStorage.getItem("admin")) ||
    JSON.parse(sessionStorage.getItem("admin"));

const userRole = admin ? "admin" : "user";


let userNav = document.getElementById("userNav");
let adminNav = document.getElementById("adminNav");

if (userRole === "admin") {

    userNav.classList.add("d-none");
    adminNav.classList.remove("d-none");
    

} else {

    userNav.classList.remove("d-none");
    adminNav.classList.add("d-none");

}
// =====================================
// LOGIN BUTTON
// =====================================

let registerdUsersession =
    JSON.parse(sessionStorage.getItem("loginedUser"));

let myBtn =
    document.getElementById("mylogin");

let myProfile =
    document.getElementById("myprofile");

let userCookie =
    document.cookie
        .split("; ")
        .find(cookie =>
            cookie.startsWith("loginedUser=")
        );


if (userRole === "admin") {

    myBtn.innerHTML = "Logout";

    myBtn.classList.add("btn-danger");

    myProfile.classList.add("d-none");

} else if (userCookie || registerdUsersession) {

    myBtn.innerHTML = "Logout";

    myBtn.classList.add("btn-danger");

    myProfile.classList.remove("d-none");

} else {

    myBtn.innerHTML = "Login";

    myBtn.classList.remove("btn-danger");

    myBtn.style.border = "1px solid #0ea5a8";

    myProfile.classList.add("d-none");

}


myBtn.onclick = function () {

    if (userCookie) {

        document.cookie =
            "loginedUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    }

    if (registerdUsersession) {

        sessionStorage.removeItem("loginedUser");

    }

    localStorage.removeItem("admin");

    sessionStorage.removeItem("admin");

    window.location.href =
        "../html/login.html";

};


myProfile.onclick = function () {

    window.location.href =
        "../html/profile.html";

};

// =====================================
// CARDS
// =====================================

let adminCards =
    JSON.parse(localStorage.getItem("adminCards")) || [];

let editId = null;


// =====================================
// LOAD CARDS
// =====================================

function loadCards() {

    adminCards.forEach(function (destination) {

        const container =
            document.getElementById(
                destination.category + "Container"
            );

        if (!container) {
            return;
        }

        createCard(destination, container);

    });

}


// =====================================
// CREATE CARD
// =====================================

function createCard(destination, container) {

    const card = document.createElement("div");

    card.classList.add(
        "col-lg-4",
        "col-md-6",
        "col-sm-12"
    );


    // ================================
    // ADMIN BUTTONS
    // ================================

    let adminButtons = "";

    if (userRole === "admin") {

        adminButtons = `

            <br><br>

            <button class="updateBtn">

                <i class="bi bi-pencil-square"></i>

                Update

            </button>


            <button class="deleteBtn">

                <i class="bi bi-trash3-fill"></i>

                Delete

            </button>

        `;

    }


    // ================================
    // CARD HTML
    // ================================

    card.innerHTML = `

        <div class="card">

            <img src="${destination.image}">

            <div class="card-body">

                <h3>
                    ${destination.name}
                </h3>


                <p>

                    <i class="bi bi-geo-alt-fill"></i>

                    ${destination.country}

                </p>


                <p>

                    <i class="bi bi-star-fill"></i>

                    ${destination.rating}

                </p>


                <p>
                    ${destination.description}
                </p>


                <strong>

                    From $${destination.price}

                </strong>


                <br><br>


                <button class="detailsBtn">

                    <i class="bi bi-eye-fill"></i>

                    View Details

                </button>


                ${adminButtons}

            </div>

        </div>

    `;


    container.appendChild(card);


    // =================================
    // VIEW DETAILS
    // =================================

    card.querySelector(".detailsBtn").onclick =
        function () {

            localStorage.setItem(
                "selectedDestination",
                JSON.stringify(destination)
            );

            window.location.href =
                "details.html";

        };


    // =================================
    // ADMIN FUNCTIONS
    // =================================

    if (userRole === "admin") {


        // ==============================
        // DELETE
        // ==============================

        card.querySelector(".deleteBtn").onclick =
            function () {

                adminCards = adminCards.filter(
                    function (item) {

                        return item.id !== destination.id;

                    }
                );


                localStorage.setItem(
                    "adminCards",
                    JSON.stringify(adminCards)
                );


                card.remove();

            };


        // ==============================
        // UPDATE
        // ==============================

        card.querySelector(".updateBtn").onclick =
            function () {

                editId = destination.id;


                document.getElementById("name").value =
                    destination.name || "";


                document.getElementById("country").value =
                    destination.country || "";


                document.getElementById("rating").value =
                    destination.rating || "";


                document.getElementById("description").value =
                    destination.description || "";


                document.getElementById("price").value =
                    destination.price || "";


                document.getElementById("about").value =
                    destination.about || "";


                document.getElementById("thingsToDo").value =
                    destination.thingsToDo || "";


                document.getElementById("food").value =
                    destination.food || "";


                document.getElementById("hotels").value =
                    destination.hotels || "";


                document.getElementById("bestTime").value =
                    destination.bestTime || "";


                document.getElementById("travelTips").value =
                    destination.travelTips || "";


                document.getElementById("category").value =
                    destination.category || "trending";


                document.getElementById("cardImage").value = "";


                document.getElementById("cardForm").style.display =
                    "block";


                document.getElementById("saveBtn").innerText =
                    "Update";

            };

    }

}


// =====================================
// NEW CARD
// =====================================

const newCardBtn =
    document.getElementById("newCardBtn");


if (newCardBtn && userRole === "admin") {

    newCardBtn.onclick = function () {

        editId = null;


        document.getElementById("name").value = "";

        document.getElementById("country").value = "";

        document.getElementById("rating").value = "";

        document.getElementById("description").value = "";

        document.getElementById("price").value = "";

        document.getElementById("about").value = "";

        document.getElementById("thingsToDo").value = "";

        document.getElementById("food").value = "";

        document.getElementById("hotels").value = "";

        document.getElementById("bestTime").value = "";

        document.getElementById("travelTips").value = "";

        document.getElementById("category").value =
            "trending";

        document.getElementById("cardImage").value = "";


        document.getElementById("cardForm").style.display =
            "block";


        document.getElementById("saveBtn").innerText =
            "Add Card";

    };

}


// =====================================
// SAVE CARD
// =====================================

const saveBtn =
    document.getElementById("saveBtn");


if (saveBtn && userRole === "admin") {

    saveBtn.onclick = function () {


        const name =
            document.getElementById("name").value;


        const country =
            document.getElementById("country").value;


        const rating =
            document.getElementById("rating").value;


        const description =
            document.getElementById("description").value;


        const price =
            document.getElementById("price").value;


        const about =
            document.getElementById("about").value;


        const thingsToDo =
            document.getElementById("thingsToDo").value;


        const food =
            document.getElementById("food").value;


        const hotels =
            document.getElementById("hotels").value;


        const bestTime =
            document.getElementById("bestTime").value;


        const travelTips =
            document.getElementById("travelTips").value;


        const category =
            document.getElementById("category").value;


        const file =
            document.getElementById("cardImage").files[0];


        // ==============================
        // VALIDATION
        // ==============================

        if (
            !name ||
            !country ||
            !rating ||
            !description ||
            !price
        ) {

            alert("Please fill all required fields.");

            return;

        }


        // ==============================
        // UPDATE
        // ==============================

        if (editId !== null) {

            const index =
                adminCards.findIndex(
                    function (item) {

                        return item.id === editId;

                    }
                );


            if (index === -1) {

                alert("Card not found");

                return;

            }


            function updateCard(image) {

                adminCards[index] = {

                    id: editId,

                    name: name,

                    country: country,

                    image: image,

                    rating: rating,

                    description: description,

                    price: price,

                    category: category,

                    about: about,

                    thingsToDo: thingsToDo,

                    food: food,

                    hotels: hotels,

                    bestTime: bestTime,

                    travelTips: travelTips

                };


                localStorage.setItem(
                    "adminCards",
                    JSON.stringify(adminCards)
                );


                document.getElementById(
                    "cardForm"
                ).style.display = "none";


                editId = null;


                location.reload();

            }


            if (file) {

                const reader =
                    new FileReader();


                reader.onload = function () {

                    updateCard(
                        reader.result
                    );

                };


                reader.readAsDataURL(file);

            } else {

                updateCard(
                    adminCards[index].image
                );

            }


            return;

        }


        // ==============================
        // ADD NEW CARD
        // ==============================

        if (!file) {

            alert("Please choose an image first.");

            return;

        }


        const reader =
            new FileReader();


        reader.onload = function () {


            const newCard = {

                id: Date.now(),

                name: name,

                country: country,

                image: reader.result,

                rating: rating,

                description: description,

                price: price,

                category: category,

                about: about,

                thingsToDo: thingsToDo,

                food: food,

                hotels: hotels,

                bestTime: bestTime,

                travelTips: travelTips

            };


            adminCards.push(newCard);


            localStorage.setItem(
                "adminCards",
                JSON.stringify(adminCards)
            );


            document.getElementById(
                "cardForm"
            ).style.display = "none";


            location.reload();

        };


        reader.readAsDataURL(file);

    };

}


// =====================================
// HIDE ADD BUTTON FOR USER
// =====================================

if (
    userRole !== "admin" &&
    newCardBtn
) {

    newCardBtn.style.display = "none";

}


// =====================================
// START
// =====================================

loadCards();