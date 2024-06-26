document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const logoutLink = document.getElementById('logoutLink');
    const cartLink = document.getElementById('cartLink');

    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        // User is logged in
        logoutLink.style.display = 'block';
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        updateCartLink();
    }

    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        logoutUser();
    });

    function updateCartLink() {
        const cart = JSON.parse(localStorage.getItem(`${loggedInUser}_cart`)) || [];
        cartLink.href = `cart.html?user=${loggedInUser}&cart=${JSON.stringify(cart)}`;
    }

    function logoutUser() {
        localStorage.removeItem('loggedInUser');
        location.href = 'login.html';
    }
});
