document.addEventListener("DOMContentLoaded", () => {
    const accountLink = document.getElementById("accountLink");

    if (!accountLink) {
        console.error("Error: Elemen accountLink tidak ditemukan di halaman.");
        return; // Menghentikan eksekusi jika elemen tidak ada
    }

    accountLink.addEventListener("click", (event) => {
        event.preventDefault();

        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (isLoggedIn) {
            window.location.href = "profile.html"; // Jika sudah login, langsung ke profil
        } else {
            window.location.href = "account.html"; // Jika belum login, ke halaman login
        }
    });
});
