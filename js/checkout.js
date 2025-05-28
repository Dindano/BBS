document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("checkout-items");
    const checkoutForm = document.getElementById("checkout-form");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ambil alamat dan metode pembayaran yang disimpan
    const savedAddress = JSON.parse(localStorage.getItem("savedAddress"));
    const savedPayment = JSON.parse(localStorage.getItem("savedPayment"));

    // Isi form checkout dengan data yang disimpan
    if (savedAddress) {
        document.getElementById("name").value = savedAddress.name;
        document.getElementById("address").value = savedAddress.detail;
    }
    if (savedPayment) {
        document.getElementById("payment").value = savedPayment.method;
    }

    // Render cart items
    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Keranjang kosong.</p>";
            return;
        }

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-img">
                <div class="cart-details">
                    <h3>${item.name}</h3>
                    <p>Harga: ${item.price}</p>
                    <p>Ukuran: ${item.size}</p>
                    <p>Jumlah: ${item.quantity}</p>
                </div>
            </div>
        `).join('');
    }

    // Handle form submission
    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Keranjang masih kosong!");
            return;
        }

        const formData = new FormData(checkoutForm);
        const order = {
            customer: {
                name: formData.get("name"),
                address: formData.get("address"),
                payment: formData.get("payment")
            },
            items: cart,
            date: new Date().toLocaleString(), // Tanda koma ditambahkan
            total: cart.reduce((sum, item) => sum + (parseInt(item.price.replace(/[^0-9]/g, "")) * item.quantity), 0), // Tanda koma ditambahkan
            status: "Menunggu Pembayaran" // Tidak perlu tanda koma di akhir
        };

        console.log("Order details:", order); // Debugging

        // Simpan transaksi ke riwayat
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push(order);
        localStorage.setItem("transactions", JSON.stringify(transactions));

        // Kosongkan keranjang
        localStorage.removeItem("cart");
        alert("Pesanan berhasil ditempatkan!");
        window.location.href = "thank-you.html"; // Redirect ke halaman terima kasih
    });

    // Render cart saat halaman dimuat
    renderCart();
});