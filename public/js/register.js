console.log("REGISTER JS LOADED");

document
.getElementById("registerForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    console.log("Submitting Form");

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const error =
        document.getElementById("errorMessage");

    error.innerText = "";

    if(password !== confirmPassword){
        error.innerText = "Passwords do not match";
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if(response.ok){

            alert("Registration Successful");

            window.location.href = "login.html";

        } else {

            error.innerText =
                data.message || "Registration Failed";
        }

    } catch(error) {

        console.error(error);

        document.getElementById("errorMessage")
        .innerText = "Server Error";

    }

});