const welcomeUsername = document.getElementById('welcomeUsername');
const logoutButton = document.getElementById('logoutButton');

const urlParams = new URLSearchParams(window.location.search);
const usernameFromURL = urlParams.get('username');

const userData = JSON.parse(localStorage.getItem('userData'));

const loggedInUser = userData.find(user => user.username === usernameFromURL && user.role === 'user');

if (loggedInUser) {
    welcomeUsername.textContent = `Welcome, ${loggedInUser.firstName} ${loggedInUser.lastName}`;
}

logoutButton.addEventListener('click', function () {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const loggedInUserIndex = userData.findIndex(user => user.username === usernameFromURL && user.role === 'user');
    if (loggedInUserIndex !== -1) {
        userData[loggedInUserIndex].isActive = false;
        localStorage.setItem('userData', JSON.stringify(userData));
    }
    window.open("login-new.html", "_self");
});
