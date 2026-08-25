const container =
    document.getElementById("bookingContainer");


// =====================================
// CHECK ADMIN
// =====================================

let admin =
    JSON.parse(localStorage.getItem("admin")) ||
    JSON.parse(sessionStorage.getItem("admin"));


// =====================================
// GET DESTINATION
// =====================================

const destination =
    JSON.parse(
        localStorage.getItem("selectedDestination")
    );


// =====================================
// GET LOGGED USER
// =====================================

let user = null;
let loginSource = "";


// =====================================
// FROM SESSION STORAGE
// =====================================

let sessionUser =
    sessionStorage.getItem("loginedUser");

if (sessionUser) {

    user = JSON.parse(sessionUser);

    loginSource = "session";

}


// =====================================
// FROM COOKIE
// =====================================

if (!user) {

    const cookies =
        document.cookie.split("; ");

    const userCookie =
        cookies.find(function (row) {

            return row.startsWith("loginedUser=");

        });


    if (userCookie) {

        user =
            JSON.parse(
                decodeURIComponent(
                    userCookie
                        .split("=")
                        .slice(1)
                        .join("=")
                )
            );

        loginSource = "cookie";

    }

}


// =====================================
// CHECK ADMIN
// =====================================

if (admin) {

    container.innerHTML = `

        <div class="booking-card text-center">

            <i class="bi bi-shield-lock-fill text-danger fs-1"></i>

            <h2 class="mt-3">
                Admin Cannot Book
            </h2>

            <p class="text-muted">
                Sorry, administrators cannot book trips.
            </p>

            <a
                href="home.html"
                class="btn btn-primary">

                Back Home

            </a>

        </div>

    `;

}


// User or destination missing

else if (!user || !destination) {

    container.innerHTML = `

        <div class="booking-card text-center">

            <h2>
                Unable to Book
            </h2>

            <p>
                Please login first.
            </p>

            <a
                href="login.html"
                class="btn btn-primary">

                Login

            </a>

        </div>

    `;

}


// Show booking

else {

    if (!user.id) {

        user.id = Date.now();

        sessionStorage.setItem(
            "loginedUser",
            JSON.stringify(user)
        );

    }


    container.innerHTML = `

        <div class="booking-card">

            <div class="text-center mb-4">

                <i class="bi bi-airplane-fill text-primary fs-1"></i>

                <h2 class="mt-2">
                    Book Your Trip
                </h2>

            </div>


            <h3>
                ${destination.name}
            </h3>

            <p class="text-muted">

                <i class="bi bi-geo-alt-fill"></i>

                ${destination.country}

            </p>

            <hr>


            <h5>
                Your Information
            </h5>

            <p>

                <strong>Name:</strong>

                ${user.name}

            </p>


            <p>

                <strong>Email:</strong>

                ${user.email}

            </p>


            <p>

                <strong>Phone:</strong>

                ${user.phone}

            </p>


            <hr>


            <h5>
                Trip Information
            </h5>


            <p>

                <strong>Price:</strong>

                $${destination.price}

                per person

            </p>


            <form id="bookingForm">


                <div class="mb-3">

                    <label class="form-label">

                        Travel Date

                    </label>


                    <input
                        type="date"
                        id="travelDate"
                        class="form-control">

                </div>


                <div class="mb-3">

                    <label class="form-label">

                        Number of Travelers

                    </label>


                    <input
                        type="number"
                        id="travelers"
                        class="form-control"
                        min="1"
                        value="1">

                </div>


                <button
                    type="submit"
                    class="btn btn-success w-100">

                    <i class="bi bi-calendar-check"></i>

                    Confirm Booking

                </button>


            </form>

        </div>

    `;

}


// Confirm booking

document.addEventListener(
    "submit",
    function (e) {


        if (
            e.target.id !== "bookingForm"
        ) {

            return;

        }


        e.preventDefault();


        let travelDate =
            document.getElementById(
                "travelDate"
            ).value;


        let travelers =
            Number(
                document.getElementById(
                    "travelers"
                ).value
            );


        if (!travelDate) {

            Swal.fire({

                icon: "warning",

                title: "Choose a date",

                text:
                    "Please select your travel date."

            });

            return;

        }


        if (travelers < 1) {

            Swal.fire({

                icon: "warning",

                title: "Invalid number",

                text:
                    "Number of travelers must be at least 1."

            });

            return;

        }


        let price =
            Number(destination.price);


        let totalPrice =
            price * travelers;


        // Create temporary booking

        let booking = {

            bookingId: Date.now(),

            userId: user.id,

            name: user.name,

            email: user.email,

            phone: user.phone,

            destination: destination.name,

            country: destination.country,

            travelDate: travelDate,

            travelers: travelers,

            price: price,

            totalPrice: totalPrice,
            status: "Pending"

        };


        // Save temporarily until payment

        sessionStorage.setItem(
            "pendingBooking",
            JSON.stringify(booking)
        );


        // Go to payment

        window.location.href =
            "payment.html";

    }
);