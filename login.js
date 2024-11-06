// ----------login/register----------------------
var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

// Toggle between login and register forms
function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.classList.add("white-btn");
    b.classList.remove("white-btn");
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function register() {
    x.style.left = "-610px";
    y.style.right = "5px";
    a.classList.remove("white-btn");
    b.classList.add("white-btn");
    x.style.opacity = 0;
    y.style.opacity = 1;
}

function myMenuFunction() {
    var i = document.getElementById("navMenu");

    if (i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

// Form validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    const name = document.getElementById('email').value;
    const email = document.getElementById('password').value;
   

    if (email === '' || password === '') {
        e.preventDefault();
        alert('Please fill out all fields before submitting.');
    }
});


// Attach event listener to the login submit button
document.querySelector("#login-submit").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    if (validateLoginForm()) {
        // If validation passes, allow form submission or perform login logic
        alert("Login successful!");
    }
});

// Validate login form
function validateLoginForm() {
    var emailField = document.getElementById("login-email");
    var passwordField = document.getElementById("login-password");
    var email = emailField.value;
    var password = passwordField.value;
    var isValid = true;

    // Clear previous error messages
    clearLoginErrors();

    // Email validation
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        showLoginError(emailField, "Please enter a valid email.");
        isValid = false;
    }

    // Password validation (at least 6 characters)
    if (password.length < 6) {
        showLoginError(passwordField, "Password must be at least 6 characters long.");
        isValid = false;
    }

    return isValid;
}

// Show error message and style the input with error for login
function showLoginError(inputField, message) {
    var errorMessage = document.getElementById(inputField.id + "-error");
    errorMessage.textContent = message; // Display the error message
    inputField.classList.add("input-error"); // Highlight the input field
}

// Clear all error messages and input error styles for login
function clearLoginErrors() {
    var loginErrorMessages = document.querySelectorAll("#login .error-message");
    loginErrorMessages.forEach(function(message) {
        message.textContent = ""; // Clear the text content
    });

    var loginErrorInputs = document.querySelectorAll("#login .input-error");
    loginErrorInputs.forEach(function(input) {
        input.classList.remove("input-error"); // Remove error styling
    });
}
