const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import Semua Routes
const produkRoutes = require('./routes/produkRoutes');
const userRoutes = require('./routes/userRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes'); // <-- TAMBAHAN BARU

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Gunakan Routes
app.use('/api/produk', produkRoutes);
app.use('/api/user', userRoutes);
app.use('/api/transaksi', transaksiRoutes); // <-- DIDAFTARKAN DI SINI

app.get('/', (req, res) => {
    res.send('Server Compustore Ready!');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});