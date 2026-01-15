const db = require('../config/database'); 

// 1. Buat Transaksi Baru (Checkout)
const createTransaksi = (req, res) => {
    // Tangkap data dari Android
    const { user_id, total_harga, detail } = req.body;

    // Validasi
    if (!user_id || !detail || detail.length === 0) {
        return res.status(400).json({ 
            message: "Data transaksi tidak lengkap", 
            detail_error: "user_id atau detail kosong" 
        });
    }

    // --- PERBAIKAN DI SINI ---
    // HAPUS 'tanggal' dan 'NOW()' dari query karena kolomnya tidak ada di database
    const queryTransaksi = "INSERT INTO transaksi (user_id, total_harga) VALUES (?, ?)";

    db.query(queryTransaksi, [user_id, total_harga], (err, result) => {
        if (err) {
            console.error("Error Insert Transaksi:", err);
            return res.status(500).json({ error: err.message });
        }

        const transaksiId = result.insertId;
        
        // Loop simpan detail & kurangi stok
        detail.forEach(item => {
            // Update Stok
            const queryUpdateStok = "UPDATE produk SET stok = stok - ? WHERE produk_id = ?";
            db.query(queryUpdateStok, [item.jumlah, item.produk_id], (errStok) => {
                if (errStok) console.error("Gagal update stok:", errStok.message);
            });

            // (Opsional) Insert ke detail_transaksi jika tabelnya ada
            // const queryDetail = "INSERT INTO detail_transaksi ...";
            // db.query(queryDetail, ...);
        });

        res.json({ message: "Transaksi berhasil", transaksiId: transaksiId });
    });
};

// 2. Ambil Riwayat Transaksi
// 2. Ambil Riwayat Transaksi User
// 2. Ambil Riwayat Transaksi User
const getRiwayatTransaksi = (req, res) => {
    const userId = req.params.userId;
    
    // --- PERBAIKAN: HAPUS 'ORDER BY ...' ---
    // Kita gunakan SELECT standar dulu untuk menghindari error salah nama kolom ID
    const query = "SELECT * FROM transaksi WHERE user_id = ?";

    db.query(query, [userId], (err, results) => {
        if (err) {
            // Ini akan muncul di Terminal VS Code jika masih error
            console.error("Error Database:", err.message); 
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

module.exports = {
    createTransaksi,
    getRiwayatTransaksi
};