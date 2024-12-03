const dbConnect = require("../db.js");
const handleDbConnection = require('../utils/dbUtils.js');

module.exports.getEmployees = async (req, res) => {
    await handleDbConnection(async (db) => {
        const query = "SELECT * FROM employees";
        const [result] = await db.execute(query);

        res.status(200).send({
            code: "200",
            message: "List of Employees",
            data: result,
        });
    }).catch((err) => {
        console.error("Error occurred:", err);
        res.status(500).send({
            message: 'An error has occurred!',
            error: err.message,
        });
    });
};

module.exports.addEmployee = async (req, res) => {
    const { firstName, lastName, email, position } = req.body;
    const imageName = req.file ? req.file.filename : null;

    if (!firstName || !lastName || !email || !position) {
        return res.status(400).send({ message: "All fields are required" });
    }

    

    await handleDbConnection(async (db) => {

        const checkQuery = "SELECT COUNT(*) AS count FROM employees WHERE email = ?";
        const [checkResult] = await db.execute(checkQuery, [email]);

        if (checkResult[0].count > 0) {
            return res.status(409).send({
                message: "An employee with this email already exists",
            });
        }

        const query = "INSERT INTO employees (firstName, lastName, email, position, imageName) VALUES (?, ?, ?, ?, ?)";
        const values = [firstName, lastName, email, position, imageName];
        const [result] = await db.execute(query, values);

        res.status(201).send({
            code: "201",
            message: "Employee added successfully",
            data: {
                employeeID: result.insertId,
                firstName,
                lastName,
                email,
                position,
                imageName
            },
        });
    }).catch((err) => {
        console.error("Error occurred:", err);
        res.status(500).send({
            message: 'An error occurred while adding the employee',
            error: err.message,
        });
    });
};

module.exports.updateEmployee = async (req, res) => {
    const employeeId = req.params.employeeID;
    const { firstName, lastName, email, position } = req.body;
    const imageName = req.file ? req.file.filename : undefined; // Use the uploaded file name if available

    if(!employeeId){
        return res.send({
            message: "Employee ID is required"
        });
    }

    if (!firstName && !lastName && !email && !position && !imageName) {
        return res.status(400).send({
            message: "At least one field (firstName, lastName, email, position, imageName) must be provided to update"
        });
    }

    try{
        db = await dbConnect();

        if(email){
                const checkQuery = "SELECT COUNT(*) AS count FROM employees WHERE email = ?";
            const [checkResult] = await db.execute(checkQuery, [email]);

            if (checkResult[0].count > 0) {
                return res.status(409).send({
                    message: "An employee with this email already exists",
                });
            }
        }

        // Fetch the current employee details
        const selectQuery = "SELECT * FROM employees WHERE employeeID = ?";
        const [currentEmployee] = await db.execute(selectQuery, [employeeId]);

        if (currentEmployee.length === 0) {
            return res.status(404).send({
                message: `Employee with ID ${employeeId} not found`,
            });
        }

        const existingEmployee = currentEmployee[0];

        // Determine fields to update, falling back to existing values
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
        if (email !== undefined) {
            fieldsToUpdate.push("email = ?");
            values.push(email);
        }
        if (position !== undefined) {
            fieldsToUpdate.push("position = ?");
            values.push(position);
        }
        // Use provided imageName or retain the existing one
        fieldsToUpdate.push("imageName = ?");
        values.push(imageName !== undefined ? imageName : existingEmployee.imageName);

        values.push(employeeId);


        const query = `UPDATE employees SET ${fieldsToUpdate.join(", ")} WHERE employeeID = ?`;

        const [result] = await db.execute(query, values);

        if (result.affectedRows > 0) {
            const resultQuery = "SELECT * FROM employees WHERE employeeID = ?"

            const [showResult] = await db.execute(resultQuery, [employeeId]);

            res.send({
                message: `Employee with ID ${employeeId} has been successfully updated!`,
                data: showResult
            });
        } else {
            res.send({
                message: `Employee with ID ${employeeId} not found`
            });
        }
    }
    catch (err) {
        console.error("Error occurred: ", err);
        res.status(500).send({
            message: 'An error occurred while updating the employee',
            error: err.message
        });
    } 
    finally { await db.end(); }
};

module.exports.deleteEmployee = async (req, res) => {
    const employeeId = req.params.employeeID;

    if(!employeeId){
        return res.send({
            message: "Employee ID is required"
        });
    }

    try{
        db = await dbConnect();
        const query = "DELETE FROM employees WHERE employeeID = ?";
        const [result] = await db.execute(query, [employeeId]);

        if(result.affectedRows > 0) {
            const resultQuery = "SELECT * FROM employees"

            const [showResult] = await db.execute(resultQuery);

            res.send({
                message: `Employee with ID ${employeeId} has been successfully deleted!`,
                data: showResult
            });
        } else {
            res.send({
                message: `Employee with ID ${employeeId} not found`
            });
        }
    }
    catch (err) {
        console.error("Error occurred: ", err);
        res.status(500).send({
            message: 'An error occurred while deleting the employee',
            error: err.message
        });
    } 
    finally { }
}
