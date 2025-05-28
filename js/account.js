document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded!");

    // Event listener untuk tab login/daftar
    document.querySelectorAll(".tab-link").forEach((tab) => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();

            document.querySelectorAll(".tab-link").forEach((t) => t.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

            tab.classList.add("active");
            document.querySelector(`.tab-content[data-tab="${tab.getAttribute("data-tab")}"]`).classList.add("active");
        });
    });

    // Handle form login
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        const userData = JSON.parse(localStorage.getItem("userData"));
        const loginSpinner = document.getElementById("loginSpinner");
        const loginError = document.getElementById("loginError");

        loginSpinner.style.display = "inline-block"; // Munculkan loading
        loginError.textContent = ""; // Reset pesan error

        setTimeout(() => {
            loginSpinner.style.display = "none"; // Sembunyikan loading setelah 2 detik

            if (userData && userData.email === username && userData.password === password) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", userData.fullname);
                window.location.href = "profile.html";
            } else {
                loginError.textContent = "Username atau password salah!";
            }
        }, 2000);
    });

    // Handle form register
    document.getElementById("registerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("registerPassword").value.trim();
        const confirmPassword = document.getElementById("registerConfirmPassword").value.trim();
        const registerSpinner = document.getElementById("registerSpinner");
        const registerError = document.getElementById("registerError");

        registerError.textContent = ""; // Reset pesan error

        if (!fullname || !email || !password || !confirmPassword) {
            registerError.textContent = "Semua field harus diisi!";
            return;
        }

        if (password.length < 6) {
            registerError.textContent = "Password minimal 6 karakter!";
            return;
        }

        if (password !== confirmPassword) {
            registerError.textContent = "Password dan konfirmasi password tidak sama!";
            return;
        }

        registerSpinner.style.display = "inline-block"; // Munculkan loading

        setTimeout(() => {
            registerSpinner.style.display = "none"; // Sembunyikan loading setelah 2 detik
            localStorage.setItem("userData", JSON.stringify({ fullname, email, password }));
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", fullname);
            window.location.href = "profile.html";
        }, 2000);
    });
});