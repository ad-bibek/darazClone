let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = totalSlides - 1;
    } else {
        slideIndex = index;
    }
    const offset = -slideIndex * 100 + '%';
    document.querySelector('.slider').style.transform = `translateX(${offset})`;
}

function changeSlide(n) {
    showSlide(slideIndex + n);
}

function autoSlide() {
    showSlide(slideIndex + 1);
    setTimeout(autoSlide, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const categories = [];

    function renderCategories() {
        const navMenu = document.getElementById('nav-menu');
        navMenu.innerHTML = '';

        categories.forEach(category => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = category.name;
            a.dataset.id = category.id;
            li.appendChild(a);

            if (category.subcategories && category.subcategories.length > 0) {
                const subUl = document.createElement('ul');
                subUl.className = 'sub-menu';

                category.subcategories.forEach(subcategory => {
                    const subLi = document.createElement('li');
                    const subA = document.createElement('a');
                    subA.href = '#';
                    subA.textContent = subcategory.name;
                    subA.dataset.id = subcategory.id;
                    subLi.appendChild(subA);
                    subUl.appendChild(subLi);
                });

                li.appendChild(subUl);
            }

            navMenu.appendChild(li);
        });
    }

    renderCategories();

    function fetchProducts() {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched Products:', data.products); // Log fetched products
                renderProducts(data.products);
                addProductClickListeners(data.products);
                setupSearch(data.products); // Setup search functionality
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    function renderProducts(products) {
        const productGrid = document.getElementById('product-grid');
        productGrid.innerHTML = ''; 

        products.forEach(product => {
            const productBox = document.createElement('div');
            productBox.className = 'product-box';

            const img = document.createElement('img');
            img.src = product.thumbnail;
            img.alt = product.title;

            const title = document.createElement('h3');
            title.textContent = product.title;

            const price = document.createElement('p');
            price.textContent = `$${product.price}`;

            productBox.appendChild(img);
            productBox.appendChild(title);
            productBox.appendChild(price);
            productGrid.appendChild(productBox);
        });
    }

    function addProductClickListeners(products) {
        const productBoxes = document.querySelectorAll('.product-box');
        productBoxes.forEach((productBox, index) => {
            productBox.addEventListener('click', () => {
                const productId = products[index].id; // Assuming each product has an 'id' property
                navigateToProductDetails(productId);
            });
        });
    }

    function navigateToProductDetails(productId) {
        window.location.href = `product-details.html?id=${productId}`;
    }

    function setupSearch(products) {
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(query)
            );
            renderProducts(filteredProducts);
            addProductClickListeners(filteredProducts); 
        });
    }

    fetchProducts();
});
