const container =
    document.getElementById("bookingContainer");


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
        cookies.find(function(row) {

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
// CHECK USER & DESTINATION
// =====================================

if (!user || !destination) {

    container.innerHTML = `

        <div class="text-center">

            <h2>Unable to Book</h2>

            <p>
                Please login first.
            </p>

        </div>

    `;

}


// =====================================
// SHOW BOOKING PAGE
// =====================================

else {

    container.innerHTML = `

        <div class="card p-4">

            <h2>
                ${destination.name}
            </h2>

            <p>
                ${destination.country}
            </p>

            <hr>

            <h4>
                Your Information
            </h4>

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

            <h4>
                Trip Information
            </h4>

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
                        class="form-control"
                    >

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
                        value="1"
                    >

                </div>


                <button
                    type="submit"
                    class="btn btn-success">

                    Confirm Booking

                </button>

            </form>

        </div>

    `;

}


// =====================================
// CONFIRM BOOKING
// =====================================

document.addEventListener(
    "submit",
    function(e) {

        if (e.target.id !== "bookingForm") {

            return;

        }


        e.preventDefault();


        const travelDate =
            document.getElementById(
                "travelDate"
            ).value;


        const travelers =
            Number(
                document.getElementById(
                    "travelers"
                ).value
            );


        // =================================
        // CHECK DATE
        // =================================

        if (!travelDate) {

            Swal.fire({

                icon: "warning",

                title: "Choose a date",

                text:
                    "Please select your travel date."

            });

            return;

        }


        // =================================
        // CHECK TRAVELERS
        // =================================

        if (travelers < 1) {

            Swal.fire({

                icon: "warning",

                title: "Invalid Number",

                text:
                    "Number of travelers must be at least 1."

            });

            return;

        }


        // =================================
        // CALCULATE TOTAL
        // =================================

        const price =
            Number(destination.price);


        const totalPrice =
            price * travelers;


        // =================================
        // CREATE BOOKING
        // =================================

        const booking = {

            bookingId: Date.now(),

            name: user.name,

            email: user.email,

            phone: user.phone,

            destination: destination.name,

            country: destination.country,

            travelDate: travelDate,

            travelers: travelers,

            price: price,

            totalPrice: totalPrice,

            status: "pending"

        };


        // =====================================
        // ADD BOOKING TO LOGGED USER
        // =====================================

        if (!user.bookings) {

            user.bookings = {};

        }


        user.bookings[destination.name] = booking;


        // =====================================
        // GET USERS FROM LOCAL STORAGE
        // =====================================

        let users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        // =====================================
        // FIND LOGGED USER
        // =====================================

        let userIndex =
            users.findIndex(function(item) {

                return item.email === user.email;

            });


        // =====================================
        // UPDATE USER IN USERS
        // =====================================

        if (userIndex !== -1) {


            // Create bookings object
            // if user doesn't have one

            if (!users[userIndex].bookings) {

                users[userIndex].bookings = {};

            }


            // Add booking to user

            users[userIndex].bookings[destination.name] =
                booking;


            // Update local user object

            user = users[userIndex];


            // Save Users

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

        }


        // =====================================
        // UPDATE LOGINED USER
        // =====================================

        if (loginSource === "session") {

            sessionStorage.setItem(
                "loginedUser",
                JSON.stringify(user)
            );

        }


        if (loginSource === "cookie") {

            document.cookie =
                "loginedUser=" +
                encodeURIComponent(
                    JSON.stringify(user)
                ) +
                "; path=/";

        }


        // =====================================
        // SAVE ALL BOOKINGS
        // =====================================

        let bookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        bookings.push(booking);


        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );


        // =====================================
        // SUCCESS
        // =====================================

        Swal.fire({

            icon: "success",

            title: "Booking Confirmed!",

            text:
                `Your trip to ${destination.name} has been booked successfully.`,

            confirmButtonText: "OK"

        }).then(function() {

            window.location.href =
                "home.html";

        });

    }
);