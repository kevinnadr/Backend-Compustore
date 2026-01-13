const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produkController');

// Route: GET /api/produk (Semua data)
router.get('/', produkController.getAllProduk);

// Route: GET /api/produk/:id (Detail satu data) -> INI YANG DICARI ANDROID
router.get('/:id', produkController.getProdukById);

// Route: POST /api/produk (Tambah data)
router.post('/', produkController.insertProduk);

// Route: PUT /api/produk/:id (Edit data)
router.put('/:id', produkController.updateProduk);

// Route: DELETE /api/produk/:id (Hapus data)
router.delete('/:id', produkController.deleteProduk);

module.exports = router;