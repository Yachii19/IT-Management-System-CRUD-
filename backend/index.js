const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}));


// Backend Route Import
const studentRoutes = require("./routes/Student-Routes.js");
const facultyRoutes = require("./routes/Faculty-Routes.js");
const officerRoutes = require("./routes/Officer-Routes.js");

// Backend Routes
app.use("/students", studentRoutes);
app.use("/faculty", facultyRoutes);
app.use("/officers", officerRoutes);


app.listen(process.env.PORT || 3000, () => console.log(`API is now connected on port ${process.env.PORT || 3000}`));
