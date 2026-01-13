const User = require('../models/userModel');

exports.registerUser = (req, res) => {
    const data = req.body;
    // Set default role jika kosong
    if (!data.role) data.role = 'user';

    User.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Registrasi berhasil', userId: result.insertId });
    });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (results.length > 0) {
            const user = results[0];
            // Cek password sederhana (di real project pakai bcrypt)
            if (user.password === password) {
                res.json({ message: 'Login sukses', data: user });
            } else {
                res.status(401).json({ message: 'Password salah' });
            }
        } else {
            res.status(401).json({ message: 'Email tidak ditemukan' });
        }
    });
};