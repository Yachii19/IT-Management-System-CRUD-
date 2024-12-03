const express = require("express");
const router = express.Router();
const facultyController = require("../controller/Faculty-Controller.js");
const upload = require("../imageUpload.js");

// Get all employee list
router.get("/", facultyController.getEmployees);

// Add an employee
router.post("/add-employee", upload.single('image'), facultyController.addEmployee);

// Update an employee based on ID
router.put("/:employeeID", upload.single('image'),facultyController.updateEmployee);

// Delete an employee based on ID
router.delete("/:employeeID", facultyController.deleteEmployee);

module.exports = router;