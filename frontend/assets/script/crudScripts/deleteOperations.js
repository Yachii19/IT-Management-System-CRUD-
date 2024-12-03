import { popupHandler } from "../utils/popup.js";
import { getStudents, getOfficers, getEmployees } from "./getOperations.js";
import { showCustomAlert } from "../utils/alert.js";

export function setupStudentDelete(studentsTable) {
    studentsTable.addEventListener("click", (event) => {
        const deleteButton = event.target.closest(".delete-container");
        const deletePopupBlocker = document.querySelector("#delete_student");
        if (deleteButton) {
            const studentId = deleteButton.getAttribute("data-id");
    
            deletePopupBlocker.classList.add("show-popup");
            document.body.classList.add('modal-open');
            popupHandler(deleteButton, deletePopupBlocker, () => {
                deleteAStudent(studentId)
            });
        }
    });
}


export async function deleteAStudent(studentId) {
    try {
        const res = await fetch(`http://localhost:4000/students/${studentId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Server error:", errorData.message);
            showCustomAlert(`Error: ${errorData.message}`);
            return;
        }
        const data = await res.json();
        console.log("Student deleted:", data);
        
        getStudents();
    } catch (err) { 
        console.error("Error deleting student:", err.message);
        showCustomAlert("Error deleting student:", err.message)
    }
}

export function setUpOfficerDelete(officerList) {
    

    officerList.addEventListener("click", (event) => {
        const deleteButton = event.target.closest("#delete_officer");
        const deletePopupBlocker = document.querySelector("#delete_officer_popup");
        if (deleteButton) {
            const officerId = deleteButton.getAttribute("data-id");
    
            deletePopupBlocker.classList.add("show-popup");
            document.body.classList.add('modal-open');
            popupHandler(deleteButton, deletePopupBlocker, () => {
                deleteAnOfficer(officerId)
            });
        }
    });
}

export async function deleteAnOfficer(officerId) {
    try {
        const res = await fetch(`http://localhost:4000/officers/${officerId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Server error:", errorData.message);
            showCustomAlert(`Error: ${errorData.message}`);
            return;
        }
        const data = await res.json();
        console.log("Officer deleted:", data);
    
        getOfficers();
    } catch (err) { 
        console.error("Error deleting officer:", err.message);
        showCustomAlert("Error deleting officer:", err.message)
    }
}

export function setUpEmployeeDelete(employeeList) {
    

    employeeList.addEventListener("click", (event) => {
        const deleteButton = event.target.closest("#delete_employee");
        const deletePopupBlocker = document.querySelector("#delete_employee_popup");
        if (deleteButton) {
            const employeeId = deleteButton.getAttribute("data-id");
    
            deletePopupBlocker.classList.add("show-popup");
            document.body.classList.add('modal-open');
            popupHandler(deleteButton, deletePopupBlocker, () => {
                deleteAnEmployee(employeeId)
            });
        }
    });
}

export async function deleteAnEmployee(employeeId) {
    try {
        const res = await fetch(`http://localhost:4000/faculty/${employeeId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Server error:", errorData.message);
            showCustomAlert(`Error: ${errorData.message}`);
            return;
        }
        const data = await res.json();
        console.log("Employee deleted:", data);
    
        getEmployees();
    } catch (err) { 
        console.error("Error deleting officer:", err.message);
        showCustomAlert("Error deleting officer:", err.message)
    }
}
