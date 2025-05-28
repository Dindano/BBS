document.addEventListener("DOMContentLoaded", () => {
    console.log("Halaman Profil Terload!");

    try {
        // Ambil data pengguna dari localStorage
        const userData = JSON.parse(localStorage.getItem("userData"));
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        // Jika tidak login, redirect ke halaman login
        if (!isLoggedIn || !userData) {
            alert("Anda belum login. Silakan login terlebih dahulu.");
            window.location.href = "account.html";
            return;
        }

        // Tampilkan data pengguna
        document.getElementById("usernameDisplay").textContent = userData.fullname;
        document.getElementById("emailDisplay").textContent = userData.email;

        // Isi input edit profil
        document.getElementById("editName").value = userData.fullname;
        document.getElementById("editEmail").value = userData.email;

        // Load foto profil dari localStorage
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) document.getElementById("profileImage").src = savedImage;

    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
        alert("Terjadi kesalahan! Silakan login ulang.");
        localStorage.clear();
        window.location.href = "account.html";
    }

    // Fungsi Logout
    document.getElementById("logoutButton").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("profileImage");
        window.location.href = "account.html"; // Redirect ke halaman login setelah logout
    });

    // Simpan perubahan profil
    document.getElementById("saveProfile").addEventListener("click", () => {
        const newName = document.getElementById("editName").value.trim();
        const newEmail = document.getElementById("editEmail").value.trim();

        if (newName === "" || newEmail === "") {
            alert("Nama dan email tidak boleh kosong!");
            return;
        }

        // Simpan perubahan ke localStorage
        const updatedUserData = { fullname: newName, email: newEmail };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        // Update tampilan
        document.getElementById("usernameDisplay").textContent = newName;
        document.getElementById("emailDisplay").textContent = newEmail;

        alert("Profil berhasil diperbarui!");
    });

    // Upload Foto Profil
    document.getElementById("uploadImage").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                document.getElementById("profileImage").src = reader.result;
                localStorage.setItem("profileImage", reader.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // ============ Fungsi Navigasi Tab ============
    const tabs = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tabContents.forEach((c) => c.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });

    // ============ Fungsi Alamat ============
    document.getElementById("addressForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const addressData = {
            name: document.getElementById("addressName").value.trim(),
            phone: document.getElementById("addressPhone").value.trim(),
            detail: document.getElementById("addressDetail").value.trim(),
        };

        // Simpan ke localStorage
        localStorage.setItem("savedAddress", JSON.stringify(addressData));
        alert("Alamat berhasil disimpan!");
        loadSavedAddress();
    });

    function loadSavedAddress() {
        const savedAddress = JSON.parse(localStorage.getItem("savedAddress"));
        const savedAddressesDiv = document.getElementById("savedAddresses");

        if (savedAddress) {
            savedAddressesDiv.innerHTML = `
                <p><strong>Nama Penerima:</strong> ${savedAddress.name}</p>
                <p><strong>Nomor Telepon:</strong> ${savedAddress.phone}</p>
                <p><strong>Alamat:</strong> ${savedAddress.detail}</p>
            `;
        } else {
            savedAddressesDiv.innerHTML = "<p>Belum ada alamat tersimpan.</p>";
        }
    }

    // ============ Fungsi Pembayaran ============
    document.getElementById("paymentForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const paymentData = {
            method: document.getElementById("paymentMethod").value,
            details: document.getElementById("paymentDetails").value.trim(),
        };

        // Simpan ke localStorage
        localStorage.setItem("savedPayment", JSON.stringify(paymentData));
        alert("Metode pembayaran berhasil disimpan!");
        loadSavedPayment();
    });

    function loadSavedPayment() {
        const savedPayment = JSON.parse(localStorage.getItem("savedPayment"));
        const savedPaymentsDiv = document.getElementById("savedPayments");

        if (savedPayment) {
            savedPaymentsDiv.innerHTML = `
                <p><strong>Metode:</strong> ${savedPayment.method}</p>
                <p><strong>Detail:</strong> ${savedPayment.details}</p>
            `;
        } else {
            savedPaymentsDiv.innerHTML = "<p>Belum ada metode pembayaran.</p>";
        }
    }

    // ============ Fungsi Riwayat Transaksi ============
    function loadTransactionHistory() {
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        const transactionHistoryDiv = document.getElementById("transactionHistory");

        if (transactions.length > 0) {
            transactionHistoryDiv.innerHTML = transactions.map((transaction, index) => `
                <div class="transaction-item">
                    <p><strong>Transaksi #${index + 1}</strong></p>
                    <p>Tanggal: ${transaction.date}</p>
                    <p>Total: ${transaction.total}</p>
                    <p>Status: ${transaction.status}</p>
                </div>
            `).join("");
        } else {
            transactionHistoryDiv.innerHTML = "<p>Belum ada transaksi.</p>";
        }
    }

    // Load data saat halaman dimuat
    loadSavedAddress();
    loadSavedPayment();
    loadTransactionHistory();
});