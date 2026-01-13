const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');

// POST: Buat Transaksi Baru (Checkout)
router.post('/', transaksiController.createTransaksi);

// GET: Ambil Semua Transaksi (Admin)
router.get('/', transaksiController.getAllTransaksi);

// GET: Ambil Transaksi User Tertentu (User - Riwayat Pesanan)
// Contoh URL: localhost:3000/api/transaksi/user/5
router.get('/user/:userId', transaksiController.getTransaksiByUser);

// GET: Ambil Detail Barang dari ID Transaksi (Saat detail diklik)
// Contoh URL: localhost:3000/api/transaksi/detail/10
router.get('/detail/:transaksiId', transaksiController.getTransaksiDetail);

module.exports = router;