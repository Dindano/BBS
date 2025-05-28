function updateCartIcon() {
  const cartBadge = document.querySelector(".cart span");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (cartBadge) {
    cartBadge.innerHTML = cart.length;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();

  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const product = e.target.closest(".product");
      const productData = {
        image: product.querySelector("img").src,
        title: product.dataset.title,
        price: product.dataset.price
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const isExist = cart.some(item => item.title === productData.title);

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
