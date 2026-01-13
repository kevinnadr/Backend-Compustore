const db = require('../config/database'); // <-- Sesuai nama file Anda

// 1. Ambil Semua Produk
const getAllProduk = (req, res) => {
    const query = "SELECT * FROM produk";
    db.query(query, (err, results) => {
        if (err) { return res.status(500).json({ error: err.message }); }
        res.json(results);
    });
};

// 2. Ambil Satu Produk (PENTING: pakai produk_id)
const getProdukById = (req, res) => {
    const id = req.params.id;
    // PASTIIN INI 'produk_id'
    const query = "SELECT * FROM produk WHERE produk_id = ?"; 

    db.query(query, [id], (err, results) => {
        if (err) { return res.status(500).json({ error: err.message }); }
        if (results.length === 0) { return res.status(404).json({ message: "Produk tidak ditemukan" }); }
        res.json(results[0]); 
    });
};

// ... (Fungsi insert, update, delete biarkan seperti kode Anda yang tadi) ...
// Pastikan insert/update/delete juga pakai 'produk_id' dan 'nama_produk'

const insertProduk = (req, res) => {
    const { nama_produk, kategori, merk, harga, stok, deskripsi, gambar } = req.body;
    const query = "INSERT INTO produk (nama_produk, kategori, merk, harga, stok, deskripsi, gambar) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [nama_produk, kategori, merk, harga, stok, deskripsi, gambar], (err, result) => {
        if (err) { return res.status(500).json({ error: err.message }); }
        res.json({ message: "Produk berhasil ditambahkan", id: result.insertId });
    });
};

const updateProduk = (req, res) => {
    const id = req.params.id;
    const { nama_produk, kategori, merk, harga, stok, deskripsi, gambar } = req.body;
    const query = "UPDATE produk SET nama_produk=?, kategori=?, merk=?, harga=?, stok=?, deskripsi=?, gambar=? WHERE produk_id=?";
    db.query(query, [nama_produk, kategori, merk, harga, stok, deskripsi, gambar, id], (err, result) => {
        if (err) { return res.status(500).json({ error: err.message }); }
        res.json({ message: "Produk berhasil diupdate" });
    });
};

const deleteProduk = (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM produk WHERE produk_id=?";
    db.query(query, [id], (err, result) => {
        if (err) { return res.status(500).json({ error: err.message }); }
        res.json({ message: "Produk berhasil dihapus" });
    });
};

module.exports = { getAllProduk, getProdukById, insertProduk, updateProduk, deleteProduk };