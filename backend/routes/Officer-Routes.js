const express = require("express");
const router = express.Router();
const officerController = require("../controller/Officer-Controller.js");
const upload = require("../imageUpload.js");

// Get all officer list
router.get("/", officerController.getOfficers);

// Add an officer
router.post("/add-officer", upload.single('image'), officerController.addOfficer);

// Update an officer base on ID
router.put("/:officerID", upload.single('image'), officerController.updateOfficer);

// Delete an officer base on ID
router.delete("/:officerID", officerController.deleteOfficer);

module.exports = router;