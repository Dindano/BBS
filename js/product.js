document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const products = [
        { 
            id: "1", 
            name: "Jaket Pink", 
            price: "Rp 350.000", 
            image: "img/jaket pink2.webp", 
            description: "Jaket pink dengan bahan yang nyaman dan cocok untuk cuaca dingin.",
            detailImages: ["img/jaket pink2.webp", "img/jaket pink2.webp", "img/jaket pink2.webp"]
        },
        { 
            id: "2", 
            name: "Jogger Pants", 
            price: "Rp 280.000", 
            image: "img/joger.webp", 
            description: "Celana jogger dengan bahan yang ringan dan nyaman digunakan sehari-hari.",
            detailImages: ["img/joger.webp", "img/joger.webp", "img/joger.webp"]
        },
        { 
            id: "3", 
            name: "Kemeja Salur", 
            price: "Rp 199.000", 
            image: "img/salur.webp", 
            description: "Baju Kemeja wanita dengan bahan katun berkualitas tinggi. Cocok untuk hangout dan kerja.",
            detailImages: ["img/salur1.webp", "img/salur2.webp", "img/salur3.webp"]
        },
        { 
            id: "4", 
            name: "Kemeja Tambal sulam", 
            price: "Rp 249.000", 
            image: "img/Kemeja tambal sulam.webp", 
            description: "Kemeja tambal sulam cocok untuk layering dengan gaya kasual.",
            detailImages: ["img/Kemeja tambal sulam.webp", "img/Kemeja tambal sulam.webp", "img/Kemeja tambal sulam.webp"]
        },
        { 
            id: "5", 
            name: "Kemeja Fitted Shirt", 
            price: "Rp 249.000", 
            image: "img/Fitted Shirt.webp", 
            description: "Kemeja Fitted Shirt cocok untuk layering dengan gaya kasual.",
            detailImages: ["img/Fitted Shirt.webp", "img/Fitted Shirt.webp", "img/Fitted Shirt.webp"]
        },
        { 
            id: "6", 
            name: "Kemeja Korduroi", 
            price: "Rp 299.000", 
            image: "img/Kemeja Korduroi.webp", 
            description: "Kemeja Korduroi cocok untuk layering dengan gaya kasual.",
            detailImages: ["img/Kemeja Korduroi.webp", "img/Kemeja Korduroi.webp", "img/Kemeja Korduroi.webp"]
        }
    ];

    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById("main-image").src = product.image;
        document.getElementById("product-name").innerText = product.name;
        document.getElementById("product-price").innerText = product.price;
        document.getElementById("product-description").innerText = product.description;

        const thumbnailContainer = document.querySelector(".thumbnail-container");
        thumbnailContainer.innerHTML = "";
        product.detailImages.forEach(imgSrc => {
            const imgElement = document.createElement("img");
            imgElement.src = imgSrc;
            imgElement.classList.add("thumbnail");
            imgElement.addEventListener("click", () => {
                document.getElementById("main-image").src = imgSrc;
            });
            thumbnailContainer.appendChild(imgElement);
        });

        document.querySelector(".btn-cart").addEventListener("click", () => {
            addToCart(product);
        });

        document.querySelector(".btn-checkout").addEventListener("click", () => {
            window.location.href = "checkout.html";
        });
    } else {
        document.querySelector(".product-info").innerHTML = "<p>Produk tidak ditemukan!</p>";
    }
});

let selectedSize = null;
document.querySelectorAll(".size-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedSize = button.getAttribute("data-size");
    });
});

function addToCart(product) {
    if (!selectedSize) {
        alert("Silakan pilih ukuran terlebih dahulu!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.id === product.id && item.size === selectedSize);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, size: selectedSize, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} (Ukuran: ${selectedSize}) berhasil ditambahkan ke keranjang!`);
}