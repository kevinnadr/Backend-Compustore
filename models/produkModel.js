const db = require('../config/database');

const Produk = {
    // Ambil semua data
    getAll: (callback) => {
        const sql = "SELECT * FROM produk";
        db.query(sql, callback);
    },

    // Filter berdasarkan Kategori & Merk
    getByFilter: (kategori, merk, callback) => {
        let sql = "SELECT * FROM produk";
        let params = [];

        if (kategori && merk) {
            sql += " WHERE kategori = ? AND merk = ?";
            params = [kategori, merk];
        } else if (kategori) {
            sql += " WHERE kategori = ?";
            params = [kategori];
        }

        db.query(sql, params, callback);
    },

    // Tambah Data
    create: (data, callback) => {
        const sql = "INSERT INTO produk SET ?";
        db.query(sql, data, callback);
    },

    // Update Data
    update: (id, data, callback) => {
        const sql = "UPDATE produk SET ? WHERE produk_id = ?";
        db.query(sql, [data, id], callback);
    },

    // Hapus Data
    delete: (id, callback) => {
        const sql = "DELETE FROM produk WHERE produk_id = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = Produk;