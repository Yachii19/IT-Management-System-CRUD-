const dbConnect = require("../db.js");
const handleDbConnection = require('../utils/dbUtils.js');

module.exports.getOfficers = async (req, res) => {
    await handleDbConnection(async (db) => {
        const query = "SELECT * FROM officers";
        const [data] = await db.execute(query);

        res.status(200).send({
            code: "200",
            message: "List of Officers",
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

module.exports.addOfficer = async (req, res) => {
    const { firstName, lastName, email, year, section, birthday, role } = req.body;
    const imageName = req.file ? req.file.filename : null;

    if (!firstName || !lastName || !email || !year || !section || !birthday || !role) {
        return res.status(400).send({ message: "All fields are required" });
    }

    

    await handleDbConnection(async (db) => {

        const checkQuery = "SELECT COUNT(*) AS count FROM officers WHERE email = ?";
        const [checkResult] = await db.execute(checkQuery, [email]);

        if (checkResult[0].count > 0) {
            return res.status(409).send({
                message: "An officer with this email already exists",
            });
        }

        const query = "INSERT INTO officers (firstName, lastName, email, year, section, birthday, role, imageName) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [firstName, lastName, email, year, section, birthday, role, imageName];
        const [result] = await db.execute(query, values);

        res.status(201).send({
            code: "201",
            message: "Officer added successfully",
            data: {
                officerID: result.insertId,
                firstName,
                lastName,
                email,
                year,
                section,
                birthday,
                role,
                imageName
            },
        });
    }).catch((err) => {
        console.error("Error occurred:", err);
        res.status(500).send({
            message: 'An error occurred while adding the officer',
            error: err.message,
        });
    });
};

module.exports.updateOfficer = async (req, res) => {
    const officerId = req.params.officerID;
    const { firstName, lastName, email, year, section, birthday, role } = req.body;
    const imageName = req.file ? req.file.filename : undefined; // Use the uploaded file name if available

    if (!officerId) {
        return res.status(400).send({
            message: "Officer ID is required",
        });
    }

    if (!firstName && !lastName && !email && !year && !section && !birthday && !role && !imageName) {
        return res.status(400).send({
            message: "At least one field must be provided to update",
        });
    }

    try {
        // Connect to the database
        db = await dbConnect();

        // Check if there is already an existing email
        if(email){
                const checkQuery = "SELECT COUNT(*) AS count FROM officers WHERE email = ?";
            const [checkResult] = await db.execute(checkQuery, [email]);

            if (checkResult[0].count > 0) {
                return res.status(409).send({
                    message: "An officer with this email already exists",
                });
            }

        }
    

        // Fetch the current officer details
        const selectQuery = "SELECT * FROM officers WHERE officerID = ?";
        const [currentOfficer] = await db.execute(selectQuery, [officerId]);

        if (currentOfficer.length === 0) {
            return res.status(404).send({
                message: `Officer with ID ${officerId} not found`,
            });
        }

        const existingOfficer = currentOfficer[0];

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
        if (role !== undefined) {
            fieldsToUpdate.push("role = ?");
            values.push(role);
        }
        // Use provided imageName or retain the existing one
        fieldsToUpdate.push("imageName = ?");
        values.push(imageName !== undefined ? imageName : existingOfficer.imageName);

        values.push(officerId);

        // Construct and execute the update query
        const updateQuery = `UPDATE officers SET ${fieldsToUpdate.join(", ")} WHERE officerID = ?`;
        const [updateResult] = await db.execute(updateQuery, values);

        if (updateResult.affectedRows > 0) {
            // Fetch and return the updated officer
            const resultQuery = "SELECT * FROM officers WHERE officerID = ?";
            const [updatedOfficer] = await db.execute(resultQuery, [officerId]);

            res.status(200).send({
                message: `Officer with ID ${officerId} has been successfully updated!`,
                data: updatedOfficer[0],
            });
        } else {
            res.status(404).send({
                message: `Officer with ID ${officerId} not found`,
            });
        }
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send({
            message: "An error occurred while updating the officer",
            error: err.message,
        });
    } finally {
        // Close the database connection
        await db.end();
    }
};


module.exports.deleteOfficer = async (req, res) => {
    const officerId = req.params.officerID;

    if(!officerId){
        return res.send({
            message: "Officer ID is required"
        });
    }

    try{
        db = await dbConnect();
        const query = "DELETE FROM officers WHERE officerID = ?";
        const [result] = await db.execute(query, [officerId]);

        if(result.affectedRows > 0) {
            const resultQuery = "SELECT * FROM officers"

            const [showResult] = await db.execute(resultQuery);

            res.send({
                message: `Officer with ID ${officerId} has been successfully deleted!`,
                data: showResult
            });
        } else {
            res.send({
                message: `Officer with ID ${officerId} not found`
            });
        }
    }
    catch (err) {
        console.error("Error occurred: ", err);
        res.status(500).send({
            message: 'An error occurred while deleting the officer',
            error: err.message
        });
    } 
    finally { }
}
