document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();

  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const product = e.target.closest(".product");

      // Ambil data dari atribut HTML (pastikan ada data-id, data-title, data-price)
      const productData = {
        id: product.dataset.id,
        name: product.dataset.title,
        price: product.dataset.price,
        image: product.querySelector("img").src,
        size: "default", // default karena halaman ini belum ada pilihan ukuran
        quantity: 1
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const isExist = cart.some(item => item.id === productData.id && item.size === productData.size);

      if (!isExist) {
        cart.push(productData);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Produk ditambahkan ke keranjang!");
        updateCartIcon();
      } else {
        alert("Produk sudah ada di keranjang!");
      }
    });
  });
});
