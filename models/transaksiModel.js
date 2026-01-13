const db = require('../config/database');

const Transaksi = {
    // 1. Buat Transaksi Baru (Kompleks: Header + Detail)
    create: (dataTransaksi, details, callback) => {
        // Mulai Transaction Database
        db.beginTransaction((err) => {
            if (err) return callback(err, null);

            // A. Insert ke tabel 'transaksi'
            const sqlHeader = "INSERT INTO transaksi SET ?";
            db.query(sqlHeader, dataTransaksi, (err, resultHeader) => {
                if (err) {
                    return db.rollback(() => callback(err, null)); // Batal jika error
                }

                const transaksiId = resultHeader.insertId; // Ambil ID Transaksi baru

                // B. Siapkan data untuk tabel 'transaksi_detail'
                // Format array untuk bulk insert: [[transaksi_id, produk_id, jumlah, ...], [...]]
                const values = details.map(item => [
                    transaksiId,
                    item.produk_id,
                    item.jumlah,
                    item.harga_satuan,
                    item.subtotal
                ]);

                const sqlDetail = "INSERT INTO transaksi_detail (transaksi_id, produk_id, jumlah, harga_satuan, subtotal) VALUES ?";
                
                db.query(sqlDetail, [values], (err, resultDetail) => {
                    if (err) {
                        return db.rollback(() => callback(err, null)); // Batal jika detail error
                    }

                    // C. Commit (Simpan Permanen)
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => callback(err, null));
                        }
                        callback(null, { transaksiId: transaksiId, message: "Transaksi Berhasil" });
                    });
                });
            });
        });
    },

    // 2. Ambil Semua Riwayat Transaksi (Untuk Admin)
    getAll: (callback) => {
        // Kita JOIN dengan tabel User agar tahu siapa yang beli
        const sql = `
            SELECT t.*, u.nama AS nama_pembeli 
            FROM transaksi t
            JOIN user u ON t.user_id = u.user_id
            ORDER BY t.tanggal_transaksi DESC
        `;
        db.query(sql, callback);
    },

    // 3. Ambil Riwayat Transaksi User Tertentu (Untuk Menu 'Riwayat Pesanan' di HP User)
    getByUserId: (userId, callback) => {
        const sql = "SELECT * FROM transaksi WHERE user_id = ? ORDER BY tanggal_transaksi DESC";
        db.query(sql, [userId], callback);
    },

    // 4. Ambil Detail Transaksi (Barang apa aja yang dibeli di transaksi X)
    getDetail: (transaksiId, callback) => {
        const sql = `
            SELECT d.*, p.nama_produk, p.gambar 
            FROM transaksi_detail d
            JOIN produk p ON d.produk_id = p.produk_id
            WHERE d.transaksi_id = ?
        `;
        db.query(sql, [transaksiId], callback);
    }
};

module.exports = Transaksi;