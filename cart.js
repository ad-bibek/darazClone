// Function to load cart items from local storage
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItemsContainer.innerHTML = '';

    cart.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const cartItemImage = document.createElement('img');
        cartItemImage.src = product.images[0];
        cartItemImage.alt = product.title;
        cartItemImage.className = 'cart-item-image';

        const cartItemDetails = document.createElement('div');
        cartItemDetails.className = 'cart-item-details';

        const cartItemTitle = document.createElement('h3');
        cartItemTitle.textContent = product.title;

        const cartItemPrice = document.createElement('p');
        cartItemPrice.textContent = `Rs. ${product.price}`;

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-from-cart';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromCart(index));

        cartItemDetails.appendChild(cartItemTitle);
        cartItemDetails.appendChild(cartItemPrice);
        cartItemDetails.appendChild(removeButton);

        cartItem.appendChild(cartItemImage);
        cartItem.appendChild(cartItemDetails);

        cartItemsContainer.appendChild(cartItem);
    });
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Load cart items when the page loads
document.addEventListener('DOMContentLoaded', loadCartItems);
