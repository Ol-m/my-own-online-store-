const sliderWrapper = document.querySelector('.sliderWrapper');
const slider = sliderWrapper.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
const arrowLeft = document.querySelector('.productSliderArrowLeft');
const arrowRight = document.querySelector('.productSliderArrowRight');

let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let slideWidth = slides[0].clientWidth;

arrowLeft.addEventListener('click', moveLeft);
arrowRight.addEventListener('click', moveRight);

slider.addEventListener('mousedown', startTouch);
slider.addEventListener('touchstart', startTouch);
slider.addEventListener('mousemove', moveTouch);
slider.addEventListener('touchmove', moveTouch);
slider.addEventListener('mouseup', endTouch);
slider.addEventListener('touchend', endTouch);
slider.addEventListener('mouseleave', endTouch);

function moveLeft() {
    currentTranslate += slideWidth;
    if (currentTranslate > 0) {
        currentTranslate = -slideWidth * (slides.length - 1);
    }
    slider.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
}

function moveRight() {
    currentTranslate -= slideWidth;
    if (currentTranslate < -slideWidth * (slides.length - 1)) {
        currentTranslate = 0;
    }
    slider.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
}

function startTouch(e) {
    if (e.type === 'touchstart') {
        startPosition = e.touches[0].clientX;
    } else {
        startPosition = e.clientX;
        e.preventDefault();
    }
    isDragging = true;

    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
    prevTranslate = currentTranslate;
}

function moveTouch(e) {
    if (!isDragging) return;
    const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = currentPosition - startPosition;
    currentTranslate = prevTranslate + diff;
    slider.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
}

const sliderWidth = sliderWrapper.clientWidth;
function endTouch() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const threshold = sliderWidth / 4;

    if (Math.abs(currentTranslate - prevTranslate) > threshold) {
        if (currentTranslate < prevTranslate) {
            moveRight();
        } else {
            moveLeft();
        }
    } else {
        currentTranslate = prevTranslate;
    }

    const centerIndex = Math.round(-currentTranslate / slideWidth);
    const centerTranslate = -centerIndex * slideWidth;

    const difference = centerTranslate - currentTranslate;
    currentTranslate = centerTranslate;

    prevTranslate = currentTranslate;
    slider.style.transform = `translate3d(${prevTranslate}px, 0, 0)`;
    slider.classList.remove('grabbing');

    currentTranslate += difference;
}

function animation() {
    const centerIndex = Math.round(-currentTranslate / slideWidth);
    const centerTranslate = -centerIndex * slideWidth;
    currentTranslate = centerTranslate;

    slider.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    if (isDragging) requestAnimationFrame(animation);
}

