// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch the product details
fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        renderProductDetails(product);
    })
    .catch(error => console.error('Error fetching product details:', error));

// Function to render product details
function renderProductDetails(product) {
    const productDetailsContainer = document.getElementById('product-details');
    productDetailsContainer.innerHTML = ''; // Clear any existing content

    // Create HTML elements to display product details
    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const description = document.createElement('p');
    description.textContent = product.description;

    // Create a container for the images
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

    // Append elements to the product details container
    productDetailsContainer.appendChild(title);
    productDetailsContainer.appendChild(price);
    productDetailsContainer.appendChild(description);
    productDetailsContainer.appendChild(imagesContainer);
}
