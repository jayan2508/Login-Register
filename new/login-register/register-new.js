const registrationForm = document.getElementById('registrationForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
const role = document.getElementById('role');

if (!localStorage.getItem('userData')) {
    localStorage.setItem('userData', JSON.stringify([]));
}

function validateForm() {
    let isValid = true;
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("userError").innerHTML = "";
    document.getElementById("alert").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";

    if (!firstName.value.trim()) {
        document.getElementById("nameError").innerHTML = "Please enter your first name";
        isValid = false;
    }

    if (!username.value.trim()) {
        document.getElementById("userError").innerHTML = "Enter your user name";
        isValid = false;
    } else {
        const isUsernameTaken = JSON.parse(localStorage.getItem('userData')).some(user => user.username === username.value);
        if (isUsernameTaken) {
            document.getElementById("userError").innerHTML = 'Username is already taken.';
            isValid = false;
        }
    }

    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.value.trim().match(emailPattern)) {
        document.getElementById("emailError").innerHTML = "Email not valid";
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        document.getElementById("alert").innerHTML = "Confirm password does not match";
        isValid = false;
    }

    return isValid;
}

registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validateForm()) {
        const newUser = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            username: username.value.trim(),
            password: password.value,
            email: email.value.trim(),
            role: role.value,
            isActive: false
        };

        const userData = JSON.parse(localStorage.getItem('userData')) || [];
        userData.push(newUser);
        localStorage.setItem('userData', JSON.stringify(userData));
        registrationForm.reset();
        window.open("login-new.html", "_self");
    }
});

firstName.addEventListener('input', () => {
    document.getElementById("nameError").innerHTML = "";
});

username.addEventListener('input', () => {
    document.getElementById("userError").innerHTML = "";
});

email.addEventListener('input', () => {
    document.getElementById("emailError").innerHTML = "";
});

password.addEventListener('input', () => {
    document.getElementById("alert").innerHTML = "";
});

confirmPassword.addEventListener('input', () => {
    document.getElementById("alert").innerHTML = "";
});

var passwordEye;
function passC() {
    if (passwordEye === 1) {
        document.getElementById("confirmPassword").type = 'password';
        document.getElementById("c-pass-icon").src = 'eye-hide.png';
        passwordEye = 0;
    } else {
        document.getElementById("confirmPassword").type = 'text';
        document.getElementById("c-pass-icon").src = 'eye.png';
        passwordEye = 1;
    }
}

var passwordEye;
function pass() {
    if (passwordEye === 1) {
        document.getElementById("password").type = 'password';
        document.getElementById("pass-icon").src = 'eye-hide.png';
        passwordEye = 0;
    } else {
        document.getElementById("password").type = 'text';
        document.getElementById("pass-icon").src = 'eye.png';
        passwordEye = 1;
    }
}