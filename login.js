document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    loginUser();
});
function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginMessage = document.getElementById('loginMessage');

    if (!validateEmail(email) && !validatePhone(email)) {
        loginMessage.textContent = 'Invalid email or phone number format.';
        loginMessage.style.color = 'red';
        return;
    }

    if (email === '' || password === '') {
        loginMessage.textContent = 'Both fields are required.';
        loginMessage.style.color = 'red';
        return;
    }

    const storedUser = localStorage.getItem(email);
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
            loginMessage.textContent = 'Login successful! Redirecting to homepage...';
            loginMessage.style.color = 'green';
            
            setTimeout(function() {
                location.href = 'index.html';
            }, 1500);
        } else {
            loginMessage.textContent = 'Incorrect password.';
            loginMessage.style.color = 'red';
        }
    } else {
        loginMessage.textContent = 'User not found.';
        loginMessage.style.color = 'red';
    }
}