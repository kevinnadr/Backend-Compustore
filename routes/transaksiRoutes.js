const express = require('express');
const router = express.Router();

// Import Controller (Pastikan path-nya benar)
const transaksiController = require('../controllers/transaksiController');

// Debugging: Cek apakah fungsi terbaca (Optional)
// console.log(transaksiController); 

// Endpoint 1: POST /api/transaksi (Checkout)
// Pastikan 'createTransaksi' ada di controller
router.post('/', transaksiController.createTransaksi);

// Endpoint 2: GET /api/transaksi/user/:userId (Riwayat)
// Error Anda (baris 9) kemungkinan ada di sini
// Pastikan 'getRiwayatTransaksi' ada di controller
router.get('/user/:userId', transaksiController.getRiwayatTransaksi);

module.exports = router;