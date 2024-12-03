import { headerScrollEffect } from "./utils/header.js";
import { closeButton, updateCloseButton } from "./utils/close-btn-hover.js";
import { getStudents } from "./crudScripts/getOperations.js";
import { addStudent } from "./crudScripts/addOperations.js";
import { setupStudentDelete } from "./crudScripts/deleteOperations.js";
headerScrollEffect();
closeButton();
updateCloseButton();

// Ensure that the DOM is fully loaded before running the code
document.addEventListener("DOMContentLoaded", () => {

    // Display the students
    // Includes the initial Event clicker to open the update Modal
    getStudents();

    // Shows and handles the adding of students if there are no errors
    addStudent();

    // Shows and handles the deleting of students
    const studentsTable = document.querySelector("#students_table");
    setupStudentDelete(studentsTable, () => {
        getStudents()
    });
});