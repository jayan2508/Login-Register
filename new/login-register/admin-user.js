const userTableBody = document.getElementById('userTableBody');
const adminMessage = document.getElementById('adminMessage');
const logoutButton = document.getElementById('logoutButton');

let userData = JSON.parse(localStorage.getItem('userData')) || [];
const userUsers = userData.filter(user => user.role === 'user');

if (userUsers.length > 0) {
    adminMessage.style.display = 'none';
    populateUserTable(userUsers);
} else {
    adminMessage.style.display = 'block';
    userTableBody.style.display = 'none';
}

logoutButton.addEventListener('click', function () {
    window.open("login-new.html", "_self");
});

function populateUserTable(users) {
    userTableBody.innerHTML = '';

    users.forEach(user => {
        if (user.role === 'user') {
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
