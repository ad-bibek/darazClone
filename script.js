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
