const express = require("express");
const router = express.Router();
const studentController = require("../controller/Student-Controller.js");

// Get all student list
router.get("/", studentController.getStudents);

// Get a student based on ID
router.get("/:studentID", studentController.getSpecificStudent);

// Add a student
router.post("/add-student", studentController.addStudent);

// Update a student base on ID
router.put("/:studentID", studentController.updateStudent);

// Delete a student base on ID
router.delete("/:studentID", studentController.deleteStudent);

module.exports = router;