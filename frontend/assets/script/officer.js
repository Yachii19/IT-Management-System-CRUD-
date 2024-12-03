import { headerScrollEffect } from "./utils/header.js";
import { closeButton, updateCloseButton } from "./utils/close-btn-hover.js";
import { getOfficers } from "./crudScripts/getOperations.js";
import {  addOfficer } from "./crudScripts/addOperations.js";
import { setUpOfficerDelete } from "./crudScripts/deleteOperations.js";
import { fileUploadHandler } from "./utils/customFileUpload.js";

headerScrollEffect();
closeButton();
updateCloseButton();

// Ensure that the DOM is fully loaded before running the code
document.addEventListener("DOMContentLoaded", () => {

    // Display the officers
    getOfficers();

    // Shows and handles the adding of officers if there are no errors
    addOfficer();
    
    // Shows and handles the deleting of officers
    const officerList = document.querySelector("#officer_list");
    setUpOfficerDelete(officerList, () => {
        getOfficers();
    })
});

// File Upload Execute
fileUploadHandler();