

// API: Add Item to Cart (Multiple Examples)
// You can use these cURL commands to test different cases:

// Example 1: Add a T-Shirt
/*
curl -X POST http://localhost:5000/api/cart \
-H "Content-Type: application/json" \
-d '{"id": 1, "name": "T-Shirt", "price": 100000, "image": "tshirt.jpg", "quantity": 1}'
*/

// Example 2: Add Sneakers
/*
curl -X POST http://localhost:5000/api/cart \
-H "Content-Type: application/json" \
-d '{"id": 2, "name": "Sneakers", "price": 350000, "image": "sneakers.jpg", "quantity": 1}'
*/

// Example 3: Add a Backpack
/*
curl -X POST http://localhost:5000/api/cart \
-H "Content-Type: application/json" \
-d '{"id": 3, "name": "Backpack", "price": 200000, "image": "backpack.jpg", "quantity": 1}'
*/



// API: Add Item to Cart
// You can use this cURL command to test the API:
/*
curl -X POST http://localhost:5000/api/cart \
-H "Content-Type: application/json" \
-d '{"id": 1, "name": "T-Shirt", "price": 100000, "image": "tshirt.jpg", "quantity": 1}'
*/

document.addEventListener("DOMContentLoaded", async () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const checkoutButton = document.getElementById("checkout-btn");

    async function fetchCart() {
        try {
            const response = await fetch("http://localhost:5000/api/cart");
            if (!response.ok) throw new Error("Gagal mengambil data keranjang");
            const cart = await response.json();
            renderCart(cart);
        } catch (error) {
            console.error("Error:", error);
            cartItemsContainer.innerHTML = "<p>Gagal memuat keranjang.</p>";
        }
    }

    function renderCart(cart) {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <p>${item.name}</p>
                    <p>Rp ${item.price} x ${item.quantity}</p>
                    <button onclick="removeFromCart('${item.id}')">Hapus</button>
                </div>
            `;
        });
        cartTotal.textContent = `Total: Rp ${total}`;
        cartCount.textContent = cart.length;
    }

    async function removeFromCart(itemId) {
        try {
            await fetch(`http://localhost:5000/api/cart/${itemId}`, {
                method: "DELETE",
            });
            fetchCart();
        } catch (error) {
            console.error("Gagal menghapus item:", error);
        }
    }

    checkoutButton.addEventListener("click", async () => {
        try {
            const response = await fetch("http://localhost:5000/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error("Checkout gagal");
            alert("Checkout berhasil!");
            fetchCart();
        } catch (error) {
            console.error("Checkout error:", error);
        }
    });

    fetchCart();
});
