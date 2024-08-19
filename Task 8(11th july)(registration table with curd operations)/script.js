function registerUser() {
    // Clear previous error messages
    document.getElementById("fullNameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("mobileError").textContent = "";
    document.getElementById("usernameError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    // Get form values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let valid = true;

    // Validate Full Name
    if (fullName === "") {
        document.getElementById("fullNameError").textContent = "Full Name cannot be empty.";
        valid = false;
    } else if (!/^[A-Z]/.test(fullName)) {
        document.getElementById("fullNameError").textContent = "Full Name must start with an uppercase letter.";
        valid = false;
    }

    // Validate Email
    if (email === "") {
        document.getElementById("emailError").textContent = "Email ID cannot be empty.";
        valid = false;
    } else if (!/.+@.+\..+/.test(email)) {
        document.getElementById("emailError").textContent = "Email ID must contain '@' and '.com'.";
        valid = false;
    }

    // Validate Mobile Number
    if (mobile === "") {
        document.getElementById("mobileError").textContent = "Mobile Number cannot be empty.";
        valid = false;
    } else if (!/^[7-9]\d{9}$/.test(mobile)) {
        document.getElementById("mobileError").textContent = "Mobile Number must start with 7, 8, or 9 and have 10 digits.";
        valid = false;
    }

    // Validate Username
    if (username === "") {
        document.getElementById("usernameError").textContent = "Username cannot be empty.";
        valid = false;
    } else if (!/^[a-z0-9@]{5,10}$/.test(username)) {
        document.getElementById("usernameError").textContent = "Username must be 5-10 characters long and contain lowercase letters, numbers, and '@'.";
        valid = false;
    }

    // Validate Password
    if (password === "") {
        document.getElementById("passwordError").textContent = "Password cannot be empty.";
        valid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}/.test(password)) {
        document.getElementById("passwordError").textContent = "Password must be at least 10 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.";
        valid = false;
    }

    // If all fields are valid, store data and display success message
    if (valid) {
        const user = { fullName, email, mobile, username, password };
        storeUser(user);
        document.getElementById("message").textContent = "User registered successfully!";
        document.getElementById("showTableButton").style.display = "block"; // Show the button to display the table
    } else {
        document.getElementById("message").textContent = "";
    }
}

function storeUser(user) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

function redirectToUserTable() {
    window.location.href = "userTable.html";
}

// Hide the button on page load
window.onload = function() {
    document.getElementById("showTableButton").style.display = "none";
};
