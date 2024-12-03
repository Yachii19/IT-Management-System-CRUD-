const dbConnect = require("../db.js");
const handleDbConnection = require('../utils/dbUtils.js');

module.exports.getStudents = async (req, res) => {
    await handleDbConnection(async (db) => {
        const query = "SELECT * FROM students";
        const [data] = await db.execute(query);

        // Code to format the date fetched from the dataabase to a readable form
        data.forEach(student => {
            const date = new Date(student.birthday);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            student.birthday = date.toLocaleDateString('en-US', options);
        });

        res.status(200).send({
            code: "200",
            message: "List of Students",
            data: data,
        });
    }).catch((err) => {
        console.error("Error occurred:", err);
        res.status(500).send({
            message: 'An error has occurred!',
            error: err.message,
        });
    });
};

module.exports.getSpecificStudent = async (req, res) => {
    await handleDbConnection(async (db) => {
        const studentId = req.params.studentID;
        if(!studentId){
            return res.send({
                message: "Student ID is required"
            });
        }
        const query = "SELECT * FROM STUDENTS WHERE studentID = ?";
        const [data] = await db.execute(query, [studentId]);

        res.status(200).send({
            code: "200",
            message: `Info of student ${studentId}`,
            data: data,
        });
    }).catch((err) => {
        console.error("Error occurred:", err);
        res.status(500).send({
            message: 'An error has occurred!',
            error: err.message,
        });
    });
}

module.exports.addStudent = async (req, res) => {
    const { firstName, lastName, email, year, section, birthday } = req.body;

    if (!firstName || !lastName || !email || !year || !section || !birthday) {
        return res.status(400).send({ message: "All fields are required" });
    }

    

    await handleDbConnection(async (db) => {

        const checkQuery = "SELECT COUNT(*) AS count FROM students WHERE email = ?";
        const [checkResult] = await db.execute(checkQuery, [email]);

        if (checkResult[0].count > 0) {
            return res.status(409).send({
                message: "A student with this email already exists",
            });
        }

        const query = "INSERT INTO students (firstName, lastName, email, year, section, birthday) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [firstName, lastName, email, year, section, birthday];
        const [result] = await db.execute(query, values);

        res.status(201).send({
            code: "201",
            message: "Student added successfully",
            data: {
                studentID: result.insertId,
                firstName,
                lastName,
                email,
                year,
                section,
                birthday
            },
        });
    }).catch((err) => {
        console.error("Error occurred:", err);
        res.status(500).send({
            message: 'An error occurred while adding the student',
            error: err.message,
        });
    });
};

module.exports.updateStudent = async (req, res) => {
    const studentId = req.params.studentID;
    const { firstName, lastName, email, year, section, birthday } = req.body;

    if(!studentId){
        return res.send({
            message: "Student ID is required"
        });
    }

    

    if (!firstName && !lastName && !email && !year && !section && !birthday) {
        return res.status(400).send({
            message: "At least one field (firstName, lastName, email, year, section, birthday) must be provided to update"
        });
    }

    try{
        db = await dbConnect();

        // Check if there is already an existing email
        if(email) {
            const checkQuery = "SELECT COUNT(*) AS count FROM students WHERE email = ?";
            const [checkResult] = await db.execute(checkQuery, [email]);
    
            if (checkResult[0].count > 0) {
                return res.status(409).send({
                    message: "A student with this email already exists",
                });
            }
        }
       
        const fieldsToUpdate = [];
        const values = [];

        if (firstName !== undefined) {
            fieldsToUpdate.push("firstName = ?");
            values.push(firstName);
        }
        if (lastName !== undefined) {
            fieldsToUpdate.push("lastName = ?");
            values.push(lastName);
        }
        if (email !==undefined) {
            fieldsToUpdate.push("email = ?");
            values.push(email);
        }
        if (year !== undefined) {
            fieldsToUpdate.push("year = ?");
            values.push(year);
        }
        if (section !== undefined) {
            fieldsToUpdate.push("section = ?");
            values.push(section);
        }
        if (birthday !== undefined) {
            fieldsToUpdate.push("birthday = ?");
            values.push(birthday);
        }

        values.push(studentId);

        const query = `UPDATE students SET ${fieldsToUpdate.join(", ")} WHERE studentID = ?`;

        const [result] = await db.execute(query, values);
        

        if (result.affectedRows > 0) {
            const resultQuery = "SELECT * FROM students WHERE studentID = ?"

            const [showResult] = await db.execute(resultQuery, [studentId]);
            res.send({
                message: `Student with ID ${studentId} has been successfully updated!`,
                data: showResult
            });
        } else {
            res.send({
                message: `Student with ID ${studentId} not found`
            });
        }
    }
    catch (err) {
        console.error("Error occurred: ", err);
        res.status(500).send({
            message: 'An error occurred while updating the student',
            error: err.message
        });
    } 
    finally { await db.end(); }
};

module.exports.deleteStudent = async (req, res) => {
    const studentId = req.params.studentID;

    if(!studentId){
        return res.send({
            message: "Student ID is required"
        });
    }

    try{
        db = await dbConnect();
        const query = "DELETE FROM students WHERE studentID = ?";
        const [result] = await db.execute(query, [studentId]);

        if(result.affectedRows > 0) {
            const resultQuery = "SELECT * FROM students"

            const [showResult] = await db.execute(resultQuery);

            res.send({
                message: `Student with ID ${studentId} has been successfully deleted!`,
                data: showResult
            });
        } else {
            res.send({
                message: `Student with ID ${studentId} not found`
            });
        }
    }
    catch (err) {
        console.error("Error occurred: ", err);
        res.status(500).send({
            message: 'An error occurred while deleting the student',
            error: err.message
        });
    } 
    finally {}
}
