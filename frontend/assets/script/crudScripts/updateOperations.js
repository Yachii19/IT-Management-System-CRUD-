import { showCustomAlert } from "../utils/alert.js";
import { updateModalHandler } from "../utils/modal.js";
import { getStudents, getOfficers, getEmployees } from "./getOperations.js";
import { popupHandler } from "../utils/popup.js";

export function setUpStudentUpdate() {
    const updateForm = document.querySelector("#update_form");

    const updates = document.querySelectorAll('.update-container');
    updates.forEach((updateContainer) => {
        updateContainer.addEventListener("click", () => {
            const studentId = updateContainer.getAttribute("data-id");
            console.log("Update student with ID:", studentId);
            updateForm.classList.add("show-blocker");
            document.body.classList.add("modal-open");
            updateAStudent(studentId);  
        })      
    })
}

async function handleUpdateSubmit(event) {
    const popupTrigger = document.querySelector('#update_btn');
    const popupBlocker = document.querySelector('#update_success');

    event.preventDefault();

    const studentId = event.target.getAttribute("data-id");
    const formData = {};

    if (document.querySelector("#updateFirstName").value) {
        formData.firstName = document.querySelector("#updateFirstName").value;
    }
    if (document.querySelector("#updateLastName").value) {
        formData.lastName = document.querySelector("#updateLastName").value;
    }
    if (document.querySelector("#updateEmail").value) {
        formData.email = document.querySelector("#updateEmail").value;
    }
    if (document.querySelector("#updateBirthday").value) {
        formData.birthday = document.querySelector("#updateBirthday").value;
    }
    if (document.querySelector("#updateYear").value) {
        formData.year = document.querySelector("#updateYear").value;
    }
    if (document.querySelector("#updateSection").value) {
        formData.section = document.querySelector("#updateSection").value;
    }

    try {
        const res = await fetch(`http://localhost:4000/students/${studentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Server error:", errorData.message);
            showCustomAlert(`Error: ${errorData.message}`);
            return;
        }

        const data = await res.json();
        console.log(`Officer updated: ${data}`);
        popupBlocker.classList.add("show-popup");
        popupHandler(popupTrigger, popupBlocker);
        
        // Reset the form after a successful update
        const updateStudentForm = document.querySelector("#update_student_form");
        updateStudentForm.reset();

        // Used the this function to reload the displayed students after updating
        getStudents();
    } catch (err) {
        console.error("Error updating student:", err.message);
        showCustomAlert("Error updating student:", err.message);
    }
}

// Function to run the update whenever the submit button is clicked
export function updateAStudent(studentId) {
    const updateForm = document.querySelector("#update_form");
    const updateCloseModal = document.querySelector("#update_close_btn");
    const updateCloseModalSubmit = document.querySelector("#update_submit_form");
    const updateStudentForm = document.querySelector("#update_student_form");

    // Remove any existing event listener
    updateStudentForm.removeEventListener("submit", handleUpdateSubmit);

    // Set the `data-id` attribute on the form to track the current student
    updateStudentForm.setAttribute("data-id", studentId);

    // Add an event listener to the form for the specific student based on the data-id
    updateStudentForm.addEventListener("submit", handleUpdateSubmit);

    // Used the function from the utils
    updateModalHandler(updateForm, updateCloseModal, updateCloseModalSubmit);
}

export function setUpOfficerUpdate() {
    const updateForm = document.querySelector("#update_form");

    const updates = document.querySelectorAll('#update_officer');
    updates.forEach((update) => {
        update.addEventListener("click", () => {
            const officerId = update.getAttribute("data-id");
            console.log("Update officer with ID:", officerId);
            updateForm.classList.add("show-blocker");
            document.body.classList.add("modal-open");
            updateAnOfficer(officerId)
        })      
    })
}


async function handleOfficerUpdateSubmit(event) {
    const updateOfficerForm = document.querySelector("#update_form");
    const popupTrigger = document.querySelector('#officer_update_btn');
    const popupBlocker = document.querySelector('#officer_update_success');
    event.preventDefault();

    const officerId = event.target.getAttribute("data-id");
    const formData = new FormData();

    if (document.querySelector("#updateFirstName").value) {
        formData.append("firstName", document.querySelector("#updateFirstName").value);
    }
    if (document.querySelector("#updateLastName").value) {
        formData.append("lastName", document.querySelector("#updateLastName").value);
    }
    if (document.querySelector("#updateEmail").value) {
        formData.append("email", document.querySelector("#updateEmail").value);
    }
    if (document.querySelector("#updateBirthday").value) {
        formData.append("birthday", document.querySelector("#updateBirthday").value);
    }
    if (document.querySelector("#updateYear").value) {
        formData.append("year", document.querySelector("#updateYear").value);
    }
    if (document.querySelector("#updateSection").value) {
        formData.append("section", document.querySelector("#updateSection").value);
    }
    if (document.querySelector("#updateRole").value) {
        formData.append("role", document.querySelector("#updateRole").value);
    }


    // This only append update if there is a file uploaded, if there is none the backend logic automatically give it a sample.jpg name
    // Append image if present
    const fileInput = document.querySelector("#updateImageUpload");
    if (fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
    }

    try {
        const res = await fetch(`http://localhost:4000/officers/${officerId}`, {
            method: "PUT",
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Server error:", errorData.message);
            showCustomAlert(`Error: ${errorData.message}`);
            return;
        }

        const data = await res.json();
        console.log(`Officer updated: ${data}`);
        
        updateOfficerForm.classList.remove("show-blocker");
        popupBlocker.classList.add("show-popup");
        popupHandler(popupTrigger, popupBlocker);

        // Reset the form after a successful update
        const updateOfficersForm = document.querySelector("#update_officer_form");
        updateOfficersForm.reset();

        // Used the this function to reload the displayed students after updating
        getOfficers();
    } catch (err) {
        console.error("Error updating officer:", err.message);
        showCustomAlert("Error updating officer:", err.message)
    }
}

// Function to run the update whenever the submit button is clicked
export function updateAnOfficer(officerId) {
    const updateForm = document.querySelector("#update_form");
    const updateCloseModal = document.querySelector("#update_close_btn");
    const updateCloseModalSubmit = document.querySelector("#update_submit_form");
    const updateOfficerForm = document.querySelector("#update_officer_form");

    // Remove any existing event listener
    updateOfficerForm.removeEventListener("submit", handleOfficerUpdateSubmit);

    // Set the `data-id` attribute on the form to track the current student
    updateOfficerForm.setAttribute("data-id", officerId);

    // Add an event listener to the form for the specific student based on the data-id
    updateOfficerForm.addEventListener("submit", handleOfficerUpdateSubmit);

    // Used the function from the utils
    updateModalHandler(updateForm, updateCloseModal, updateCloseModalSubmit);
}

export function setUpEmployeeUpdate() {
    const updateForm = document.querySelector("#update_form");

    const updates = document.querySelectorAll('#update_employee');
    updates.forEach((update) => {
        update.addEventListener("click", () => {
            const employeeId = update.getAttribute("data-id");
            console.log("Update employee with ID:", employeeId);
            updateForm.classList.add("show-blocker");
            document.body.classList.add("modal-open");
            updateAnEmployee(employeeId)
        })      
    })
}


async function handleEmployeeUpdateSubmit(event) {
    const updateOfficerForm = document.querySelector("#update_form");
    const popupTrigger = document.querySelector('#employee_update_btn');
    const popupBlocker = document.querySelector('#employee_update_success');
    event.preventDefault();

    const employeeId = event.target.getAttribute("data-id");
    const formData = new FormData();

    if (document.querySelector("#updateFirstName").value) {
        formData.append("firstName", document.querySelector("#updateFirstName").value);
    }
    if (document.querySelector("#updateLastName").value) {
        formData.append("lastName", document.querySelector("#updateLastName").value);
    }
    if (document.querySelector("#updateEmail").value) {
        formData.append("email", document.querySelector("#updateEmail").value);
    }
    if (document.querySelector("#updatePosition").value) {
        formData.append("position", document.querySelector("#updatePosition").value);
    }


    // This only append update if there is a file uploaded, if there is none the backend logic automatically give it a sample.jpg name
    // Append image if present
    const fileInput = document.querySelector("#updateImageUpload");
    if (fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
    }

    try {
        const res = await fetch(`http://localhost:4000/faculty/${employeeId}`, {
            method: "PUT",
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Server error:", errorData.message);
            showCustomAlert(`Error: ${errorData.message}`);
            return;
        }

        const data = await res.json();
        console.log(`Employee updated: ${data}`);
        
        updateOfficerForm.classList.remove("show-blocker");
        popupBlocker.classList.add("show-popup");
        popupHandler(popupTrigger, popupBlocker);

        // Reset the form after a successful update
        const updateEmployeeForm = document.querySelector("#update_employee_form");
        updateEmployeeForm.reset();

        // Used the this function to reload the displayed students after updating
        getEmployees();
    } catch (err) {
        console.error("Error updating officer:", err.message);
        showCustomAlert("Error updating officer:", err.message)
    }
}

// Function to run the update whenever the submit button is clicked
export function updateAnEmployee(employeeId) {
    const updateForm = document.querySelector("#update_form");
    const updateCloseModal = document.querySelector("#update_close_btn");
    const updateCloseModalSubmit = document.querySelector("#update_submit_form");
    const updateEmployeeForm = document.querySelector("#update_employee_form");

    // Remove any existing event listener
    updateEmployeeForm.removeEventListener("submit", handleEmployeeUpdateSubmit);

    // Set the `data-id` attribute on the form to track the current student
    updateEmployeeForm.setAttribute("data-id", employeeId);

    // Add an event listener to the form for the specific student based on the data-id
    updateEmployeeForm.addEventListener("submit", handleEmployeeUpdateSubmit);

    // Used the function from the utils
    updateModalHandler(updateForm, updateCloseModal, updateCloseModalSubmit);
}