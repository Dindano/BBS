document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".add-to-cart");
    const products = document.querySelectorAll(".product");

    // Fungsi untuk menambahkan produk ke keranjang
    cartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // Mencegah default behavior dari link
            const product = event.target.closest(".product");
            const productData = {
                id: product.dataset.id,
                name: product.querySelector("p").textContent,
                price: product.querySelector(".product-price").textContent,
                image: product.querySelector("img").src,
                quantity: 1 // Tambahkan quantity default
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Cek apakah produk sudah ada di keranjang
            const existingProduct = cart.find(item => item.id === productData.id);
            if (existingProduct) {
                existingProduct.quantity += 1; // Tambahkan quantity jika produk sudah ada
            } else {
                cart.push(productData); // Tambahkan produk baru jika belum ada
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${productData.name} telah ditambahkan ke keranjang!`);
        });
    });

    // Fungsi untuk mengarahkan ke halaman detail produk saat produk diklik
    products.forEach(product => {
        const productLink = product.querySelector("a");
        productLink.addEventListener("click", (event) => {
            // Hanya arahkan ke halaman detail jika yang diklik adalah link produk, bukan tombol "Add to Cart"
            if (!event.target.classList.contains("add-to-cart")) {
                event.preventDefault(); // Mencegah default behavior dari link
                const productId = product.dataset.id;
                window.location.href = `product-detail.html?id=${productId}`;
            }
        });
    });

    // Pencarian Produk
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("input", () => {
        const searchValue = searchBar.value.toLowerCase();
        products.forEach(product => {
            const productName = product.querySelector("p").textContent.toLowerCase();
            if (productName.includes(searchValue)) {
                product.style.display = "block"; // Tampilkan produk yang sesuai
            } else {
                product.style.display = "none"; // Sembunyikan produk yang tidak sesuai
            }
        });
    });
});