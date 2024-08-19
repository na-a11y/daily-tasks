document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous error messages
    clearErrors();

    // Basic validation for all fields
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let hasErrors = false;

    if (!validateFullName(fullName)) {
        document.getElementById('fullNameError').textContent = 'Full Name must start with an uppercase letter.';
        hasErrors = true;
    }

    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        hasErrors = true;
    }

    if (!validateMobile(mobile)) {
        document.getElementById('mobileError').textContent = 'Please enter a valid mobile number.';
        hasErrors = true;
    }

    if (!validateUsername(username, email)) {
        document.getElementById('usernameError').textContent = 'Username must be all lowercase letters and cannot contain parts of the email address.';
        hasErrors = true;
    }

    if (!validatePassword(password)) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    // Display the success message
    document.getElementById('message').textContent = 'User registered successfully!';
    document.getElementById('message').style.color = 'green';
});

function clearErrors() {
    document.getElementById('fullNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('mobileError').textContent = '';
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
}

function validateFullName(fullName) {
    const re = /^[A-Z][a-zA-Z\s]*$/;
    return re.test(fullName);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validateMobile(mobile) {
    const re = /^[0-9]{10}$/;
    return re.test(String(mobile));
}

function validateUsername(username, email) {
    const emailLocalPart = email.split('@')[0];
    const re = /^[a-z]+$/;
    return re.test(username) && !username.includes(emailLocalPart);
}

function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    return re.test(password);
}
