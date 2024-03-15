document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const home = document.getElementById('home');
    const userTable = document.getElementById('userTable');
    const welcomeUsername = document.getElementById('welcomeUsername');
    const userTableBody = document.getElementById('userTableBody');
    const logoutButton = document.getElementById('logoutButton');

    // Initialize user data array in local storage if it doesn't exist
    if (!localStorage.getItem('userData')) {
        localStorage.setItem('userData', JSON.stringify([]));
    }

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Retrieve form data
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;

        // Basic validation
        if (firstName === '' || lastName === '' || username === '' || password === '' || confirmPassword === '' || email === '') {
            alert('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Password and Confirm Password do not match.');
            return;
        }

        // Check for unique username
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData.some(user => user.username === username)) {
            alert('Username is already taken. Please choose a different one.');
            return;
        }

        // Create user object
        const newUser = {
            firstName,
            lastName,
            username,
            password,
            email,
            role,
            isActive: true // Initialize user as active
        };

        // Add the new user to the user data array in local storage
        userData.push(newUser);
        localStorage.setItem('userData', JSON.stringify(userData));

        // After successful registration, display login form
        registrationForm.reset();
        // registrationForm.style.display = 'none';
        // loginForm.style.display = 'block';
    });

    // ...

// ...

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Retrieve form data
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Find the user with the matching username, password, and isActive status
    const loggedInUser = userData.find(user =>
        user.username === loginUsername &&
        user.password === loginPassword &&
        user.role === 'user'
    );

    if (loggedInUser) {
        // Toggle the isActive status from false to true
        loggedInUser.isActive = !loggedInUser.isActive; // Toggle isActive
        localStorage.setItem('userData', JSON.stringify(userData));

        // Display user section
        home.style.display = 'block';
        userTable.style.display = 'block';
        loginForm.style.display = 'none';
        welcomeUsername.textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;

        // Populate the user table with all user role data
        populateUserTable(userData, 'user');
    } else {
        // User not found or not authorized
        alert('User not found or not authorized. Please check your credentials.');
    }
});

logoutButton.addEventListener('click', function () {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Find the currently logged-in user and toggle isActive status
    const loggedInUserIndex = userData.findIndex(user => user.isActive);
    if (loggedInUserIndex !== -1) {
        userData[loggedInUserIndex].isActive = !userData[loggedInUserIndex].isActive; // Toggle isActive
        localStorage.setItem('userData', JSON.stringify(userData));

        // Clear the welcome message
        welcomeUsername.textContent = '';

        // After logout, hide the user section and show the login form
        home.style.display = 'none';
        userTable.style.display = 'none';
        loginForm.style.display = 'block';
    }
});

// ...



    // logoutButton.addEventListener('click', function () {
    //     // Retrieve user data from local storage
    //     const userData = JSON.parse(localStorage.getItem('userData'));

    //     // Find the currently logged-in user and set isActive to false
    //     const loggedInUserIndex = userData.findIndex(user => user.isActive);
    //     if (loggedInUserIndex !== -1) {
    //         userData[loggedInUserIndex].isActive = false;
    //         localStorage.setItem('userData', JSON.stringify(userData));

    //         // Clear the welcome message
    //         welcomeUsername.textContent = '';

    //         // After logout, hide the user section and show the login form
    //         home.style.display = 'none';
    //         userTable.style.display = 'none';
    //         loginForm.style.display = 'block';
    //     }
    // });

    // Function to populate the user table with active users
    function populateUserTable(users) {
        userTableBody.innerHTML = ''; // Clear existing data

        users.forEach(user => {
            if (user.isActive) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td class="${user.isActive ? 'active' : 'inactive'}">${user.isActive ? 'Active' : 'Inactive'}</td>
                `;
                userTableBody.appendChild(row);
            }
        });
    }
});
