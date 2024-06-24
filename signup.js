document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    function validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return passwordRegex.test(password);
    }

    function validateFullName(fullName) {
        return fullName.trim().length > 0;
    }

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const password = document.getElementById('password').value.trim();
        const fullName = document.getElementById('fullName').value.trim();
        
        if (!validatePhoneNumber(phoneNumber)) {
            alert('Invalid phone number. Please enter a 10-digit phone number.');
            return;
        }

        if (!validatePassword(password)) {
            alert('Invalid password. Password must be at least 6 characters long and contain at least one number and one letter.');
            return;
        }

        if (!validateFullName(fullName)) {
            alert('Please enter your full name.');
            return;
        }

        const userData = {
            phoneNumber: phoneNumber,
            password: password,
            fullName: fullName,
            promotions: document.getElementById('promotions').checked
        };

        localStorage.setItem(phoneNumber, JSON.stringify(userData));

        alert('Registration successful!');
        window.location.href = 'login.html';
    });
});
