// Function to load cart items from local storage
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.querySelector('.order-summary-container').style.display = 'none';
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

        // Add click event to update order summary when an item is clicked
        cartItem.addEventListener('click', () => {
            updateOrderSummary();
        });
    });

    // Initially hide the order summary container
    document.querySelector('.order-summary-container').style.display = 'none';
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateOrderSummary();
}

// Function to update the order summary
function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, product) => sum + product.price, 0);
    const itemCount = cart.length;
    const shippingFee = 70;
    const shippingDiscount = 0; // Default discount set to 0
    const total = subtotal + shippingFee - shippingDiscount;

    document.getElementById('item-count').textContent = itemCount;
    document.getElementById('subtotal').textContent = subtotal;
    document.getElementById('shipping-fee').textContent = shippingFee;
    document.getElementById('shipping-discount').textContent = shippingDiscount;
    document.getElementById('total').textContent = total;
    document.getElementById('checkout-item-count').textContent = itemCount;

    // Show or hide the order summary container based on the item count
    if (itemCount > 0) {
        document.querySelector('.order-summary-container').style.display = 'block';
    } else {
        document.querySelector('.order-summary-container').style.display = 'none';
    }
}

// Call loadCartItems() and updateOrderSummary() when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateOrderSummary();
});
