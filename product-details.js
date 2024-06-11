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

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const description = document.createElement('p');
    description.textContent = product.description;

    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'images-container';

    // Add all images to the images container
    product.images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = `${product.title} image ${index + 1}`;
        img.className = 'product-image';
        imagesContainer.appendChild(img);
    });

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.className = 'add-to-cart';

    const buyNowButton = document.createElement('button');
    buyNowButton.textContent = 'Buy Now';
    buyNowButton.className = 'buy-now';

    // Add event listeners to the buttons
    addToCartButton.addEventListener('click', () => {
        addToCart(product);
    });
    buyNowButton.addEventListener('click', () => {
        buyNow(product);
    });

    // Add the product details to the product details container
    

    productDetailsContainer.appendChild(imagesContainer);
    productDetailsContainer.appendChild(title);
    productDetailsContainer.appendChild(price);
    productDetailsContainer.appendChild(description);
    productDetailsContainer.appendChild(addToCartButton);
    productDetailsContainer.appendChild(buyNowButton);
}
