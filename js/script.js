document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ script.js terload!");

    /** ========== Inisialisasi Cart dari localStorage ========== */
    let cartItemsRaw = localStorage.getItem("cart");
    let cartItems = [];

    try {
        let parsed = JSON.parse(cartItemsRaw);
        if (Array.isArray(parsed)) {
            cartItems = parsed;
        }
    } catch (e) {
        console.warn("Gagal parsing cart:", e);
    }

    /** ========== Fitur: Alert pada klik ikon keranjang ========== */
    const cartIcon = document.querySelector(".cart");

    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
            console.log("Isi cart saat ini:", cartItems);
            if (cartItems.length > 0) {
                window.location.href = "keranjang.html";
            } else {
                alert("🛒 Keranjang belanja Anda masih kosong!");
            }
        });
    }

    /** ========== Fitur: Hover pada produk untuk menampilkan nama ========== */
    const products = document.querySelectorAll(".product");
    if (products.length > 0) {
        products.forEach((product) => {
            product.addEventListener("mouseenter", () => product.classList.add("hovered"));
            product.addEventListener("mouseleave", () => product.classList.remove("hovered"));
        });
    }

    /** ========== Fitur: Simulasi Pencarian Produk ========== */
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Cari produk...");
    searchInput.classList.add("search-bar");

    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.appendChild(searchInput);
    }

    searchInput.addEventListener("input", (e) => {
        const keyword = e.target.value.toLowerCase();
        products.forEach((product) => {
            const productName = product.querySelector("p")?.innerText.toLowerCase() || "";
            product.style.display = productName.includes(keyword) ? "block" : "none";
        });
    });

    /** ========== Fitur: Toggle Menu pada Layar Kecil ========== */
    const menuToggle = document.querySelector("#menu-toggle");
    const navbarNav = document.querySelector(".navbar-nav");

    if (menuToggle && navbarNav) {
        menuToggle.addEventListener("click", (event) => {
            event.preventDefault();
            navbarNav.classList.toggle("active");
        });
    }

    /** ========== Navigasi Produk ke Halaman Detail dengan Gambar ========== */
    products.forEach((product) => {
        product.addEventListener("click", () => {
            const productId = product.getAttribute("data-id");
            const productName = product.querySelector("p")?.innerText || "Produk";
            const productImage = product.querySelector("img")?.src || "";

            if (productId) {
                window.location.href = `product-detail.html?id=${productId}&name=${encodeURIComponent(productName)}&image=${encodeURIComponent(productImage)}`;
            } else {
                console.warn("⚠️ Produk tidak memiliki ID.");
            }
        });
    });

    console.log("Navigasi produk sudah aktif.");

    /** ========== Fitur: Tambah ke Keranjang ========== */
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.stopPropagation();
            const product = {
                id: this.dataset.id,
                title: this.closest(".product").dataset.title,
                price: this.closest(".product").dataset.price,
                image: this.closest(".product").querySelector("img").src
            };

            cartItems.push(product);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            updateCartIcon();
            alert(`${product.title} berhasil ditambahkan ke keranjang!`);
        });
    });

    function updateCartIcon() {
        if (cartIcon) {
            if (cartItems.length > 0) {
                cartIcon.innerHTML = `🛒 (${cartItems.length})`;
            } else {
                cartIcon.innerHTML = "🛒";
            }
        }
    }

    updateCartIcon();

    /** ========== Halaman Keranjang ========== */
    const cartContainer = document.querySelector(".cart-container") || document.querySelector(".cart-items");

    if (cartContainer) {
        function renderCart() {
            cartContainer.innerHTML = "";

            if (cartItems.length > 0) {
                cartItems.forEach((item, index) => {
                    const cartItem = document.createElement("div");
                    cartItem.classList.add("cart-item");
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.title}">
                        <div class="cart-info">
                            <p>Nama: ${item.title}</p>
                            <p>Harga: ${item.price}</p>
                            <button class="remove-item" data-index="${index}">🗑️ Hapus</button>
                        </div>
                    `;
                    cartContainer.appendChild(cartItem);
                });

                document.querySelectorAll(".remove-item").forEach(button => {
                    button.addEventListener("click", function () {
                        const index = this.dataset.index;
                        removeItem(index);
                    });
                });
            } else {
                cartContainer.innerHTML = "<p>Keranjang masih kosong.</p>";
            }
        }

        function removeItem(index) {
            cartItems.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            renderCart();
            updateCartIcon();
        }

        renderCart();
    }
});
