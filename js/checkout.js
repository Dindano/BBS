document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("checkout-items");
    const checkoutForm = document.getElementById("checkout-form-elements");
    const totalAmountElement = document.getElementById("total-amount");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ambil alamat dan metode pembayaran yang disimpan
    const savedAddress = JSON.parse(localStorage.getItem("savedAddress"));
    const savedPayment = JSON.parse(localStorage.getItem("savedPayment"));

    // Isi form checkout dengan data yang disimpan
    if (savedAddress) {
        document.getElementById("name").value = savedAddress.name || "";
        document.getElementById("address").value = savedAddress.detail || "";
    }
    if (savedPayment) {
        document.getElementById("payment").value = savedPayment.method || "";
    }

    // Simpan perubahan form secara real-time
    if (checkoutForm) {
        checkoutForm.addEventListener("input", function() {
            const addressData = {
                name: document.getElementById("name").value,
                detail: document.getElementById("address").value
            };
            const paymentData = {
                method: document.getElementById("payment").value
            };
            
            localStorage.setItem("savedAddress", JSON.stringify(addressData));
            localStorage.setItem("savedPayment", JSON.stringify(paymentData));
        });
    }

    // Format angka ke Rupiah
    function formatRupiah(angka) {
        return 'Rp' + angka.toLocaleString("id-ID");
    }

    // Render cart items dan hitung total
    function renderCart() {
        if (!cartItemsContainer) return;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p class='empty-cart'>Keranjang kosong.</p>";
            if (totalAmountElement) {
                totalAmountElement.textContent = "Rp0";
            }
            return;
        }

        cartItemsContainer.innerHTML = cart.map(item => {
            // Bersihkan format harga dan hitung subtotal
            const cleanPrice = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
            const subtotal = cleanPrice * item.quantity;
            
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-img" onerror="this.src='https://via.placeholder.com/80?text=Gambar+Produk'">
                    <div class="cart-details">
                        <h3>${item.name}</h3>
                        <p>Harga: ${formatRupiah(cleanPrice)}</p>
                        <p>Ukuran: ${item.size}</p>
                        <p>Jumlah: ${item.quantity}</p>
                        <p class="item-subtotal">Subtotal: ${formatRupiah(subtotal)}</p>
                    </div>
                </div>
            `;
        }).join('');

        // Hitung total belanja
        const totalAmount = cart.reduce((sum, item) => {
            const cleanPrice = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
            return sum + (cleanPrice * item.quantity);
        }, 0);

        if (totalAmountElement) {
            totalAmountElement.textContent = formatRupiah(totalAmount);
        }
    }

    // Handle form submission
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            if (cart.length === 0) {
                alert("Keranjang masih kosong!");
                return;
            }

            const nameInput = document.getElementById("name").value.trim();
            const addressInput = document.getElementById("address").value.trim();
            const paymentInput = document.getElementById("payment").value;

            if (!nameInput || !addressInput || !paymentInput) {
                alert("Harap lengkapi semua data pengiriman dan pembayaran!");
                return;
            }

            const totalAmount = cart.reduce((sum, item) => {
                const cleanPrice = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
                return sum + (cleanPrice * item.quantity);
            }, 0);

            const order = {
                customer: {
                    name: nameInput,
                    address: addressInput,
                    payment: paymentInput
                },
                items: cart,
                date: new Date().toLocaleString("id-ID", {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                total: totalAmount,
                status: "Menunggu Pembayaran"
            };

            // Simpan transaksi ke riwayat
            const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
            transactions.push(order);
            localStorage.setItem("transactions", JSON.stringify(transactions));

            // Kosongkan keranjang dan data form
            localStorage.removeItem("cart");
            localStorage.removeItem("savedAddress");
            localStorage.removeItem("savedPayment");
            
            // Tampilkan konfirmasi sebelum kembali ke shop
            if (confirm("Pesanan berhasil ditempatkan! Kembali ke halaman toko?")) {
                window.location.href = "shop.html";
            }
        });
    }

    // Render cart saat halaman dimuat
    renderCart();
});