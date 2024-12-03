const mysql = require("mysql2/promise");


const dbConnect = async () => {
    try {
        const connection = await mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
        });

        console.log('Successfully connected to MySQL!');
        return connection;
    } catch (err) {
        console.error('Failed to connect to MySQL:', err.message);
        throw err;
    }
};

module.exports = dbConnect;
