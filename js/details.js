const destination = JSON.parse(localStorage.getItem("selectedDestination"));
const container = document.getElementById("detailsContainer");

if (!destination) {

    container.innerHTML = `
        <div class="not-found">
            <i class="bi bi-compass"></i>
            <h2>Destination Not Found</h2>
        </div>
    `;

} else {

    container.innerHTML = `

        <button class="back-btn" onclick="history.back()">
            <i class="bi bi-arrow-left"></i>
            Back
        </button>

        <section class="hero">

            <img src="${destination.image}" alt="${destination.name}">

            <div class="hero-title">
                <span>${destination.country}</span>
                <h1>${destination.name}</h1>
            </div>

        </section>


        <section class="trip-info">

            <div class="rating">
                <i class="bi bi-star-fill"></i>
                <strong>${destination.rating}</strong>
                <span>Rating</span>
            </div>


            <div class="price">

                <small>Starting from</small>

                <strong>$${destination.price}</strong>

                <span>per person</span>

            </div>


            <button class="book-btn">

                Book This Trip

                <i class="bi bi-arrow-right"></i>

            </button>

        </section>


        <section class="description">

            <span class="label">
                ABOUT THE DESTINATION
            </span>

            <h2>
                Discover ${destination.name}
            </h2>

            <p>
                ${destination.description ||
                "No description available."}
            </p>

        </section>


        <section class="details">


            <div class="detail">

                <i class="bi bi-compass"></i>

                <div>

                    <h3>About Destination</h3>

                    <p>
                        ${destination.about ||
                        "No information available."}
                    </p>

                </div>

            </div>


            <div class="detail">

                <i class="bi bi-camera"></i>

                <div>

                    <h3>Things To Do</h3>

                    <p>
                        ${destination.thingsToDo ||
                        "No information available."}
                    </p>

                </div>

            </div>


            <div class="detail">

                <i class="bi bi-cup-hot"></i>

                <div>

                    <h3>Food</h3>

                    <p>
                        ${destination.food ||
                        "No information available."}
                    </p>

                </div>

            </div>


            <div class="detail">

                <i class="bi bi-building"></i>

                <div>

                    <h3>Best Hotels</h3>

                    <p>
                        ${destination.hotels ||
                        "No information available."}
                    </p>

                </div>

            </div>


            <div class="detail">

                <i class="bi bi-calendar3"></i>

                <div>

                    <h3>Best Time To Visit</h3>

                    <p>
                        ${destination.bestTime ||
                        "No information available."}
                    </p>

                </div>

            </div>


            <div class="detail">

                <i class="bi bi-lightbulb"></i>

                <div>

                    <h3>Travel Tips</h3>

                    <p>
                        ${destination.travelTips ||
                        "No information available."}
                    </p>

                </div>

            </div>

        </section>

    `;


    // Book Button

    document.querySelector(".book-btn").onclick = function () {

        let user = sessionStorage.getItem("loginedUser");


        if (user) {

            window.location.href = "Book.html";

            return;

        }


        const cookies = document.cookie.split("; ");

        const userCookie = cookies.find(row =>
            row.startsWith("loginedUser=")
        );


        if (userCookie) {

            window.location.href = "Book.html";

            return;

        }


        Swal.fire({

            icon: "info",

            title: "Login Required",

            text: "Please login before booking this trip.",

            showCancelButton: true,

            confirmButtonText: "Login",

            cancelButtonText: "Cancel",

            confirmButtonColor: "#198754",

            cancelButtonColor: "#6c757d"

        }).then((result) => {

            if (result.isConfirmed) {

                window.location.href = "login.html";

            }

        });

    };

}