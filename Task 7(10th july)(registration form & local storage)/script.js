function registerUser() {
    
    document.getElementById("fullNameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("mobileError").textContent = "";
    document.getElementById("usernameError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let valid = true;

    if (fullName === "") {
        document.getElementById("fullNameError").textContent = "Full Name cannot be empty.";
        valid = false;
    } else if (!/^[A-Z]/.test(fullName)) {
        document.getElementById("fullNameError").textContent = "Full Name must start with an uppercase letter.";
        valid = false;
    }

    if (email === "") {
        document.getElementById("emailError").textContent = "Email ID cannot be empty.";
        valid = false;
    } else if (!/.+@.+\..+/.test(email)) {
        document.getElementById("emailError").textContent = "Email ID must contain '@' and '.com'.";
        valid = false;
    }

   
    if (mobile === "") {
        document.getElementById("mobileError").textContent = "Mobile Number cannot be empty.";
        valid = false;
    } else if (!/^[7-9]\d{9}$/.test(mobile)) {
        document.getElementById("mobileError").textContent = "Mobile Number must start with 7, 8, or 9 and have 10 digits.";
        valid = false;
    }

    
    if (username === "") {
        document.getElementById("usernameError").textContent = "Username cannot be empty.";
        valid = false;
    } else if (!/^[a-z0-9@]{5,10}$/.test(username)) {
        document.getElementById("usernameError").textContent = "Username must be 5-10 characters long and contain lowercase letters, numbers, and '@'.";
        valid = false;
    }

   
    if (password === "") {
        document.getElementById("passwordError").textContent = "Password cannot be empty.";
        valid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}/.test(password)) {
        document.getElementById("passwordError").textContent = "Password must be at least 10 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.";
        valid = false;
    }

   
    if (valid) {
        const user = { fullName, email, mobile, username, password };
        storeUser(user);
        document.getElementById("message").textContent = "User registered successfully!";
        localStorage.setItem("showTable", "true"); 
        displayUsers();
    } else {
        document.getElementById("message").textContent = "";
    }
}

function storeUser(user) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

function displayUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userTableContainer = document.getElementById("userTableContainer");
    const userTableBody = document.getElementById("userTable").getElementsByTagName("tbody")[0];
    userTableBody.innerHTML = ""; 

    if (users.length > 0 && localStorage.getItem("showTable") === "true") {
        userTableContainer.style.display = "block";
        users.forEach(user => {
            const row = userTableBody.insertRow();
            row.insertCell(0).textContent = user.fullName;
            row.insertCell(1).textContent = user.email;
            row.insertCell(2).textContent = user.mobile;
            row.insertCell(3).textContent = user.username;
        });
    } else {
        userTableContainer.style.display = "none";
    }
}


window.onload = function() {
    localStorage.removeItem("showTable"); 
    displayUsers();
};
