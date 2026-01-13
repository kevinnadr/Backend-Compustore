const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Default XAMPP
    password: 'Kevinnadr123',      // Default kosong
    database: 'compustore_db',
    port: 3308
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL Database');
});

module.exports = db;