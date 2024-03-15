const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    const loggedInUser = userData.find(user => user.username === loginUsername && user.password === loginPassword);

    if (loggedInUser) {
        if (loggedInUser.role === 'admin') {
            if (userData.some(user => user.role === 'user')) {
                window.open(`admin-user.html?role=admin&username=${loggedInUser.username}`, "_self");
            } else {
                window.open(`admin-user.html?role=admin&username=${loggedInUser.username}`, "_self");
            }
        } else if (loggedInUser.role === 'user') {
            loggedInUser.isActive = true;
            window.open(`user.html?role=user&username=${loggedInUser.username}`, "_self");
        }
        localStorage.setItem('userData', JSON.stringify(userData));
    } else {
        document.getElementById("loginError").innerHTML = '*Please check your credentials.';
    }
});
var passwordEye;
function pass() {
    if (passwordEye === 1) {
        document.getElementById("loginPassword").type = 'password';
        document.getElementById("pass-icon").src = 'eye-hide.png';
        passwordEye = 0;
    } else {
        document.getElementById("loginPassword").type = 'text';
        document.getElementById("pass-icon").src = 'eye.png';
        passwordEye = 1;
    }
}