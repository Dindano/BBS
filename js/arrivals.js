document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".product-container");
  const searchBar = document.querySelector(".search-bar");

  function formatPrice(price) {
    return "Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function renderProducts(filteredProducts) {
    productContainer.innerHTML = "";

    if(filteredProducts.length === 0) {
      productContainer.innerHTML = "<p>Tidak ada produk yang cocok.</p>";
      return;
    }

    filteredProducts.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.dataset.id = product.id;

      productDiv.innerHTML = `
        <a href="product-detail.html?id=${product.id}" class="product-link">
          <img src="${product.image}" alt="${product.name}">
          <p>${product.name}</p>
          <span class="product-price">${formatPrice(product.price)}</span>
        </a>
        <button class="add-to-cart">🛒 Add to Cart</button>
      `;

      productContainer.appendChild(productDiv);
    });

    // Tambah event listener Add to Cart di sini
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        const productDiv = e.target.closest(".product");
        const id = productDiv.dataset.id;
        const prod = products.find(p => p.id === id);
        if (!prod) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.id === id);
        if (existing) {
          existing.quantity++;
        } else {
          cart.push({ ...prod, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${prod.name} telah ditambahkan ke keranjang!`);
      });
    });
  }

  renderProducts(products);

  searchBar.addEventListener("input", () => {
    const searchTerm = searchBar.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
    renderProducts(filtered);
  });
});
