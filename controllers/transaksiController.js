const Transaksi = require('../models/transaksiModel');

// 1. Buat Pesanan Baru (Checkout)
exports.createTransaksi = (req, res) => {
    // Data dari Android biasanya berupa JSON Object yang berisi header & array details
    const { user_id, total_harga, metode_pembayaran, metode_pengiriman, detail_barang } = req.body;

    const dataHeader = {
        user_id,
        total_harga,
        metode_pembayaran,
        metode_pengiriman,
        status_pembayaran: 'Pending',
        status_pengiriman: 'Diproses',
        tanggal_transaksi: new Date()
    };

    // Panggil Model
    Transaksi.create(dataHeader, detail_barang, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(result);
    });
};

// 2. Lihat Semua Pesanan (Admin)
exports.getAllTransaksi = (req, res) => {
    Transaksi.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// 3. Lihat Pesanan Saya (User)
exports.getTransaksiByUser = (req, res) => {
    const { userId } = req.params;
    Transaksi.getByUserId(userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// 4. Lihat Detail Barang per Transaksi
exports.getTransaksiDetail = (req, res) => {
    const { transaksiId } = req.params;
    Transaksi.getDetail(transaksiId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};