document
.getElementById("loginForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    // Email Validation

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        alert("Please enter a valid email address");

        return;
    }

    // Password Validation

    if (password.length < 6) {

        alert("Password must be at least 6 characters");

        return;
    }

    // Disable Button During Login

    const loginBtn =
        document.querySelector(".login-btn");

    loginBtn.disabled = true;
    loginBtn.innerText = "Logging In...";

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

        const data =
            await response.json();

        if (response.ok) {

            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );

            alert("Login Successful ✅");

            window.location.href =
                "index.html";

        } else {

            alert(
                data.message ||
                "Invalid Email or Password"
            );
        }

    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to server. Please try again."
        );

    } finally {

        loginBtn.disabled = false;
        loginBtn.innerText = "Login";

    }
    

});