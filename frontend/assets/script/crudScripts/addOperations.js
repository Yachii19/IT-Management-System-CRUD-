import { popupHandler } from "../utils/popup.js";
import { modalHandler } from "../utils/modal.js";
import { getStudents, getOfficers } from "./getOperations.js";
import {showCustomAlert} from "../utils/alert.js";

// ADD STUDENT
export function addStudent() {
    const addStudentForm = document.querySelector("#student_form");
    const popupTrigger = document.querySelector('#popup_btn');
    const popupBlocker = document.querySelector('#add_success');

    addStudentForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            email: document.querySelector("#email").value,
            birthday: document.querySelector("#birthday").value,
            year: document.querySelector("#year").value,
            section: document.querySelector("#section").value,
        };

        console.log(JSON.stringify(formData));

        try {
            const res = await fetch("http://localhost:4000/students/add-student", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                // Handle errors from the server
                const errorData = await res.json();
                console.error("Server error:", errorData.message);
                showCustomAlert(`Error: ${errorData.message}`);
                return;
            }

            const data = await res.json();
            console.log("Student added:", data);

            // If the student is added successfully
            addStudentForm.reset(); 
            form.classList.remove("show-blocker");
            popupBlocker.classList.add("show-popup");
            popupHandler(popupTrigger, popupBlocker);

        
            getStudents();
        } catch (err) {
            console.error("Error adding student:", err.message);
            showCustomAlert("An error occurred. Please try again later.");
        }
    });
}

export function setupAddStudent() {
    const addStudent = document.querySelector("#add_student");
    const form = document.querySelector(".screen-blocker");
    modalHandler(addStudent, form);
}


// ADD OFFICER
export function addOfficer() {
    const addOfficerForm = document.querySelector("#officer_form");

    addOfficerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("firstName", document.querySelector("#firstName").value);
        formData.append("lastName", document.querySelector("#lastName").value);
        formData.append("role", document.querySelector("#role").value);
        formData.append("email", document.querySelector("#email").value);
        formData.append("birthday", document.querySelector("#birthday").value);
        formData.append("year", document.querySelector("#year").value);
        formData.append("section", document.querySelector("#section").value);

        const imageInput = document.querySelector("#addImageUpload");
        if (imageInput.files[0]) {
            formData.append("image", imageInput.files[0]);
        }

        try {
            const res = await fetch("http://localhost:4000/officers/add-officer", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                // Handle errors from the server
                const errorData = await res.json();
                console.error("Server error:", errorData.message);
                showCustomAlert(`Error: ${errorData.message}`);
                return;
            }

            const data = await res.json();
            console.log("Officer added:", data);

            // If the officer is added successfully
            addOfficerForm.reset();
            const officerForm = document.querySelector(".screen-blocker");
            officerForm.classList.remove("show-blocker");
           
            getOfficers();
            
        } catch (err) {
            console.error("Error adding Officer:", err.message);
            showCustomAlert("An error occurred. Please try again later.")
        }
    });
}


export function setupAddOfficer() {
    const addOfficer = document.querySelector("#add_officer");
    const form = document.querySelector(".screen-blocker");
    modalHandler(addOfficer, form);
}



// ADD OFFICER
export function addEmployee() {
    const addEmployeeForm = document.querySelector("#employee_form");

    addEmployeeForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("firstName", document.querySelector("#firstName").value);
        formData.append("lastName", document.querySelector("#lastName").value);
        formData.append("position", document.querySelector("#position").value);
        formData.append("email", document.querySelector("#email").value);


        const imageInput = document.querySelector("#addImageUpload");
        if (imageInput.files[0]) {
            formData.append("image", imageInput.files[0]);
        }

        try {
            const res = await fetch("http://localhost:4000/faculty/add-employee", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                // Handle errors from the server
                const errorData = await res.json();
                console.error("Server error:", errorData.message);
                showCustomAlert(`Error: ${errorData.message}`);
                return;
            }

            const data = await res.json();
            console.log("Employee added:", data);

            // If the Employee is added successfully
            addEmployeeForm.reset();
            const employeeForm = document.querySelector(".screen-blocker");
            employeeForm.classList.remove("show-blocker");
           
            getEmployees();
            
        } catch (err) {
            console.error("Error adding Officer:", err.message);
            
        }
    });
}


export function setupAddEmployee() {
    const addEmployee = document.querySelector("#add_employee");
    const form = document.querySelector(".screen-blocker");
    modalHandler(addEmployee, form);
}