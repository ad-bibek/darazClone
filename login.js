document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }

    function validatePassword(password) {
        return password.trim().length > 0;
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        loginUser();
    });

    function loginUser() {
        const emailOrPhone = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const loginMessage = document.getElementById('loginMessage');

        if (!validateEmail(emailOrPhone) && !validatePhoneNumber(emailOrPhone)) {
            loginMessage.textContent = 'Invalid email or phone number format.';
            loginMessage.style.color = 'red';
            return;
        }

        if (!validatePassword(password)) {
            loginMessage.textContent = 'Password is required.';
            loginMessage.style.color = 'red';
            return;
        }

        const storedUserData = localStorage.getItem(emailOrPhone);
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            if (userData.password === password) {
                loginMessage.textContent = 'Login successful! Redirecting to homepage...';
                loginMessage.style.color = 'green';

                setTimeout(function () {
                    location.href = 'index.html';
                }, 1500);
            } else {
                loginMessage.textContent = 'Incorrect password.';
                loginMessage.style.color = 'red';
            }
        } else {
            loginMessage.textContent = 'User not found. Please register.';
            loginMessage.style.color = 'red';
        }
    }
});
