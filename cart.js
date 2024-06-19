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
        cartItemPrice.textContent = 'Rs. ' + product.price.toFixed(2);

        const cartItemQuantity = document.createElement('div');
        cartItemQuantity.className = 'cart-item-quantity';
        cartItemQuantity.innerHTML = `
            <label for="quantity">Quantity</label>
            <button class="decrease-quantity">-</button>
            <input type="number" class="quantity-input" value="${product.quantity}" min="1">
            <button class="increase-quantity">+</button>
        `;

        const removeFromCartButton = document.createElement('button');
        removeFromCartButton.className = 'remove-from-cart';
        removeFromCartButton.textContent = 'Remove';
        removeFromCartButton.addEventListener('click', () => removeFromCart(index));

        cartItemDetails.appendChild(cartItemTitle);
        cartItemDetails.appendChild(cartItemPrice);
        cartItemDetails.appendChild(cartItemQuantity);
        cartItem.appendChild(cartItemImage);
        cartItem.appendChild(cartItemDetails);
        cartItem.appendChild(removeFromCartButton);

        cartItemsContainer.appendChild(cartItem);

        // Add event listeners for quantity buttons
        const decreaseButton = cartItemQuantity.querySelector('.decrease-quantity');
        const increaseButton = cartItemQuantity.querySelector('.increase-quantity');
        const quantityInput = cartItemQuantity.querySelector('.quantity-input');

        decreaseButton.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateCartQuantity(index, parseInt(quantityInput.value));
            }
        });

        increaseButton.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateCartQuantity(index, parseInt(quantityInput.value));
        });

        quantityInput.addEventListener('change', () => {
            const newQuantity = parseInt(quantityInput.value);
            if (newQuantity >= 1) {
                updateCartQuantity(index, newQuantity);
            } else {
                quantityInput.value = product.quantity;
            }
        });
    });

    updateOrderSummary();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Function to update the quantity of a product in the cart
function updateCartQuantity(index, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Function to update the order summary
function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    const shippingFee = 70; // Flat shipping fee
    const shippingDiscount = 0; // Flat shipping discount

    document.getElementById('item-count').textContent = cart.length;
    document.getElementById('subtotal').textContent = 'Rs. ' + subtotal.toFixed(2);
    document.getElementById('shipping-fee').textContent = 'Rs. ' + shippingFee.toFixed(2);
    document.getElementById('shipping-discount').textContent = '-Rs. ' + shippingDiscount.toFixed(2);
    document.getElementById('total').textContent = 'Rs. ' + (subtotal + shippingFee - shippingDiscount).toFixed(2);
    document.getElementById('checkout-item-count').textContent = cart.length;
}

// Initial load
loadCartItems();
