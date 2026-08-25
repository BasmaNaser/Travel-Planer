
let complaintsContainer = document.getElementById("complaintsContainer");


let complaints = JSON.parse(localStorage.getItem("CustomerComplaints")) || [];

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


function displayComplaints() {

    complaintsContainer.innerHTML = "";

    if (complaints.length === 0) {
        complaintsContainer.innerHTML = `
            <div class="alert alert-info text-center">
                No complaints found.
            </div>
        `;
        return;
    }
    complaints.forEach(complaint => {

    let statusColor = "";

    if (complaint.status === "pending") {
        statusColor = "bg-success";
    }
    else if (complaint.status === "in-progress") {
        statusColor = "bg-primary";
    }
    else if (complaint.status === "resolved") {
        statusColor = "bg-secondary";
    }


    complaintsContainer.innerHTML += `

        <div class="card shadow-sm mb-3">

            <div class="card-body">

                <!-- Status Circle -->
                <div class="d-flex align-items-center mb-3">

                    <span
                        class="${statusColor} rounded-circle me-2"
                        style="width: 15px; height: 15px;">
                    </span>

                    <strong>
                        ${complaint.status === "pending"
                            ? "Pending"
                            : complaint.status === "in-progress"
                            ? "In Progress"
                            : "Resolved"}
                    </strong>

                </div>


                <h5>
                    ${complaint.subject}
                </h5>


                <p>
                    <strong>Name:</strong>
                    ${complaint.fullName}
                </p>


                <p>
                    <strong>Email:</strong>
                    ${complaint.email}
                </p>


                <p>
                    <strong>Message:</strong>
                    ${complaint.msg}
                </p>


                <div class="row align-items-center">

                    <div class="col-md-6">

                        <label class="form-label">
                            Status
                        </label>

                        <select
                            class="form-select"
                            onchange="changeStatus(${complaint.id}, this.value)">

                            <option
                                value="pending"
                                ${complaint.status === "pending" ? "selected" : ""}>
                                Pending
                            </option>

                            <option
                                value="in-progress"
                                ${complaint.status === "in-progress" ? "selected" : ""}>
                                In Progress
                            </option>

                            <option
                                value="resolved"
                                ${complaint.status === "resolved" ? "selected" : ""}>
                                Resolved
                            </option>

                        </select>

                    </div>


                    <div class="col-md-6 mt-3 mt-md-0">

                        <button
                            class="btn btn-danger"
                            onclick="deleteComplaint(${complaint.id})">

                            Delete

                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;

});

}


function changeStatus(id, newStatus) {

    let complaint =
        complaints.find(
            complaint => complaint.id === id
        );


    if (complaint) {

        complaint.status = newStatus;
        localStorage.setItem(
            "CustomerComplaints",
            JSON.stringify(complaints)
        );

    }

}


function deleteComplaint(id) {

    let confirmDelete =
        confirm("Are you sure you want to delete this complaint?");


    if (!confirmDelete) {
        return;
    }


    complaints =
        complaints.filter(
            complaint => complaint.id !== id
        );


    localStorage.setItem(
        "CustomerComplaints",
        JSON.stringify(complaints)
    );


    displayComplaints();

}


displayComplaints();
