

function changeStaffBasket(newImage) {
    // Сохраняем выбранное изображение в Local Storage
    localStorage.setItem('selectedImage', newImage);
    // Вызываем обновление изображений и текста
}

function addFirstSlideToCart() {
    var firstSlide = document.querySelector('.slider .slide');
    var cartImageElement = document.getElementById('cartImage');
    var firstSlideClone = firstSlide.cloneNode(true);
    cartImageElement.appendChild(firstSlideClone);
}


var imagePaths = [
    ['bUZM8M6oR0s6aAl.png', 'gVqIv3TXEGZHz6y.png','gVqIv3TXEGZHz6y.png' , 'bUZM8M6oR0s6aAl.png'],
    ['ICBQWQ7B7ZKVEzS.png', 'bUZM8M6oR0s6aAl.png', 'ICBQWQ7B7ZKVEzS.png', 'bUZM8M6oR0s6aAl.png'],
    ['2EB4fzXEClMyCrl.webp', 'bUZM8M6oR0s6aAl.png']
];

function updateText() {
    var productInfoDescription = document.querySelector('.productInfoDescription');
    if (productInfoDescription) {
        var paragraphs = productInfoDescription.querySelectorAll('p');
        var selectedImage = localStorage.getItem('selectedName');
        var textArray;

        console.log(selectedImage); // Линия отладки для проверки значения selectedImage

        switch (selectedImage) {
            case 'image1':
                textArray = imageTexts.image1;
                break;
            case 'image2':
                textArray = imageTexts.image2;
                break;
            case 'image3':
                textArray = imageTexts.image3;
                break;
            default:
                console.warn('No valid selectedImage found in localStorage.');
                textArray = ["Default text if no image is selected or found."];
        }

        paragraphs.forEach(function (paragraph, index) {
            if (textArray[index]) {
                paragraph.textContent = textArray[index];
            }
        });
    }
}

