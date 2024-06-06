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

document.addEventListener('DOMContentLoaded', (event) => {
    showSlide(slideIndex);
    setTimeout(autoSlide, 3000);
});

document.addEventListener('DOMContentLoaded', () => {
    const categories = [
        { 
            id: 1, 
            name: "Women's Fashion", 
            subcategories: [
                { id: 101, name: "Dresses" },
                { id: 102, name: "Tops" },
                { id: 103, name: "Accessories" }
            ]
        },
        { 
            id: 2, 
            name: "Health & Beauty", 
            subcategories: [
                { id: 201, name: "Makeup" },
                { id: 202, name: "Skincare" },
                { id: 203, name: "Haircare" }
            ]
        },
        { 
            id: 3, 
            name: "Men's Fashion", 
            subcategories: [
                { id: 301, name: "Shirts" },
                { id: 302, name: "Trousers" },
                { id: 303, name: "Accessories" }
            ]
        },
        { 
            id: 4, 
            name: "Watches & Accessories", 
            subcategories: [
                { id: 401, name: "Watches" },
                { id: 402, name: "Jewellery" },
                { id: 403, name: "Bags" }
            ]
        },
        { 
            id: 5, 
            name: "Electronic Devices", 
            subcategories: [
                { id: 501, name: "Mobile Phones" },
                { id: 502, name: "Laptops" },
                { id: 503, name: "Tablets" }
            ]
        },
        { 
            id: 6, 
            name: "TV & Home Appliances",
            subcategories: [
                { id: 601, name: "Televisions" },
                { id: 602, name: "Refrigerators" },
                { id: 603, name: "Air Conditioners" }
            ]
        },
        { 
            id: 7, 
            name: "Electronic Accessories",
            subcategories: [
                { id: 701, name: "Phone Cases" },
                { id: 702, name: "Chargers" },
                { id: 703, name: "Headphones" }
            ]
        },
        { 
            id: 8, 
            name: "Groceries & Pets",
            subcategories: [
                { id: 801, name: "Food" },
                { id: 802, name: "Beverages" },
                { id: 803, name: "Pet Supplies" }
            ]
        },
        { 
            id: 9, 
            name: "Babies & Toys",
            subcategories: [
                { id: 901, name: "Toys" },
                { id: 902, name: "Baby Care" },
                { id: 903, name: "Clothing" }
            ]
        },
        { 
            id: 10, 
            name: "Home & Lifestyle",
            subcategories: [
                { id: 1001, name: "Furniture" },
                { id: 1002, name: "Decor" },
                { id: 1003, name: "Kitchen" }
            ]
        },
        { 
            id: 11, 
            name: "Sports & Outdoor",
            subcategories: [
                { id: 1101, name: "Equipment" },
                { id: 1102, name: "Clothing" },
                { id: 1103, name: "Footwear" }
            ]
        },
        { 
            id: 12, 
            name: "Motors, Tools & DIY",
            subcategories: [
                { id: 1201, name: "Tools" },
                { id: 1202, name: "Automotive" },
                { id: 1203, name: "DIY" }
            ]
        }
    ];

    function renderCategories() {
        const navMenu = document.getElementById('nav-menu');
        navMenu.innerHTML = ''; // Clear any existing content

        categories.forEach(category => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = category.name;
            a.dataset.id = category.id; // Store the id in a data attribute
            li.appendChild(a);

            // Check if category has subcategories
            if (category.subcategories && category.subcategories.length > 0) {
                const subUl = document.createElement('ul');
                subUl.className = 'sub-menu';

                category.subcategories.forEach(subcategory => {
                    const subLi = document.createElement('li');
                    const subA = document.createElement('a');
                    subA.href = '#';
                    subA.textContent = subcategory.name;
                    subA.dataset.id = subcategory.id; // Store the id in a data attribute
                    subLi.appendChild(subA);
                    subUl.appendChild(subLi);
                });

                li.appendChild(subUl);
            }

            navMenu.appendChild(li);
        });
    }

    renderCategories();
});
