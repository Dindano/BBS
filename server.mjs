import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simpan data keranjang sementara (nanti bisa pakai database)
let cart = [];

// Ambil data keranjang
app.get("/api/cart", (req, res) => {
    res.json(cart);
});

// Tambah item ke keranjang
app.post("/api/cart", (req, res) => {
    const { id, name, price, image, quantity } = req.body;
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, image, quantity });
    }
    res.json({ message: "Item ditambahkan ke keranjang", cart });
});

// Hapus item dari keranjang
app.delete("/api/cart/:id", (req, res) => {
    const { id } = req.params;
    cart = cart.filter(item => item.id !== id);
    res.json({ message: "Item dihapus", cart });
});

// Checkout
app.post("/api/checkout", (req, res) => {
    cart = [];
    res.json({ message: "Checkout berhasil!" });
});

app.listen(PORT, () => {
    console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
