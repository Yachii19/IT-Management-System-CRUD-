// Created a utility function so you can reduce code redundancy

const handleDbConnection = async (callback) => {
    let db;
    try {
        db = await require("../db.js")();
        return await callback(db);
    } finally {
        if (db) await db.end();
    }
};

module.exports = handleDbConnection;