document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const checkoutButton = document.getElementById("checkout-btn");
    const emptyCartMsg = document.getElementById("empty-cart-msg");

    function getCartFromStorage() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCartToStorage(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

   function renderCart() {
    const cart = getCartFromStorage();
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        emptyCartMsg.style.display = "block";
        cartTotal.textContent = "Rp 0";
        cartCount.textContent = "0";
        return;
    } else {
        emptyCartMsg.style.display = "none";
    }

    cart.forEach((item, index) => {
        // Konversi harga string menjadi angka
        const price = Number(item.price.replace("Rp", "").replace(/\./g, "").trim());
        const quantity = Number(item.quantity);

        if (isNaN(price) || isNaN(quantity)) {
            console.warn("Item tidak valid:", item);
            return;
        }

        total += price * quantity;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Harga: Rp ${formatRupiah(price)}</p>
                    <p>Jumlah: ${quantity}</p>
                    <button class="delete-btn" onclick="removeFromCart(${index})">Hapus</button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = `Rp ${formatRupiah(total)}`;
    cartCount.textContent = cart.length;
}

    window.removeFromCart = function(index) {
        const cart = getCartFromStorage();
        cart.splice(index, 1);
        saveCartToStorage(cart);
        renderCart();
    };

    function formatRupiah(angka) {
        return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    checkoutButton.addEventListener("click", () => {
    window.location.href = "checkout.html";
});


    renderCart();
});
