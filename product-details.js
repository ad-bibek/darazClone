// Get the product ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch product details using the product ID
fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        renderProductDetails(product);
    })
    .catch(error => console.error('Error fetching product details:', error));

function renderProductDetails(product) {
    const productDetailsContainer = document.getElementById('product-details');
    
    // Create HTML elements to display product details
    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const img = document.createElement('img');
    img.src = product.image; 
    img.alt = product.title;

    const description = document.createElement('p');
    description.textContent = product.description;


    productDetailsContainer.appendChild(title);
    productDetailsContainer.appendChild(price);
    productDetailsContainer.appendChild(img);
    productDetailsContainer.appendChild(description);

}
