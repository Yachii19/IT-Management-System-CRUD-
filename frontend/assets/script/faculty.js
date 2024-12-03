import { headerScrollEffect } from "./utils/header.js";
import { closeButton, updateCloseButton } from "./utils/close-btn-hover.js";
import { getEmployees } from "./crudScripts/getOperations.js";
import { addEmployee } from "./crudScripts/addOperations.js";
import { fileUploadHandler } from "./utils/customFileUpload.js";
import { setUpEmployeeDelete } from "./crudScripts/deleteOperations.js";

headerScrollEffect();
closeButton();
updateCloseButton();

// Ensure that the DOM is fully loaded before running the code
document.addEventListener("DOMContentLoaded", () => {

    // Display the employees
    getEmployees();

    // Shows and handles the adding of employees if there are no errors
    addEmployee();
    
    // Shows and handles the deleting of officers
    const employeeList = document.querySelector("#employee_list");
    setUpEmployeeDelete(employeeList, () => {
        getEmployees();
    })
});

// File Upload Execute
fileUploadHandler();