const db = require('../config/database');

const User = {
    create: (userData, callback) => {
        const sql = "INSERT INTO user (nama, email, password, role, no_hp) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [userData.nama, userData.email, userData.password, userData.role, userData.no_hp], callback);
    },

    findByEmail: (email, callback) => {
        const sql = "SELECT * FROM user WHERE email = ?";
        db.query(sql, [email], callback);
    }
};

module.exports = User;