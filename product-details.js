// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        renderProductDetails(product);
    })
    .catch(error => console.error('Error fetching product details:', error));

// Function to render product details
function renderProductDetails(product) {
    const productDetailsContainer = document.getElementById('product-details');
    productDetailsContainer.innerHTML = '';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image-container';

    const img = document.createElement('img');
    img.src = product.images[0];
    img.alt = product.title;
    imageContainer.appendChild(img);

    const infoContainer = document.createElement('div');
    infoContainer.className = 'product-info';

    const title = document.createElement('h1');
    title.textContent = product.title;

    const rating = document.createElement('div');
   
    const price = document.createElement('div');
    price.className = 'price';
    price.innerHTML = `Rs. ${product.price} `;

    const promotion = document.createElement('div');
   

    const description = document.createElement('div');
    description.className = 'description';
    description.textContent = product.description;

    const quantity = document.createElement('div');
    quantity.className = 'quantity';
    quantity.innerHTML = `
        <label for="quantity">Quantity</label>
        <button id="decrease">-</button>
        <input type="number" id="quantity" value="1">
        <button id="increase">+</button>
    `;

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.innerHTML = `
        <button class="buy-now">Buy Now</button>
        <button class="add-to-cart">Add to Cart</button>
    `;

    infoContainer.appendChild(title);
    infoContainer.appendChild(rating);
    infoContainer.appendChild(price);
    infoContainer.appendChild(promotion);
    infoContainer.appendChild(description);
    infoContainer.appendChild(quantity);
    infoContainer.appendChild(actions);

    productDetailsContainer.appendChild(imageContainer);
    productDetailsContainer.appendChild(infoContainer);
}
