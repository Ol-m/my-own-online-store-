

// Функция для обновления выбранного размера
// Function to update the selected size and store it in localStorage
function updateSelectedSize(size) {
    // Remove 'active' class from all size buttons
    document.querySelectorAll('.productInfoSizesSize').forEach(button => {
        button.classList.remove('active');
    });

    // Add 'active' class to the selected button
    const selectedButton = [...document.querySelectorAll('.productInfoSizesSize')]
        .find(button => button.textContent.trim() === size);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // Save the selected size to localStorage
    localStorage.setItem('selectedSize', size);
}

// Function to load the selected size from localStorage and apply the 'active' class
function loadSelectedSize() {
    const savedSize = localStorage.getItem('selectedSize');
    if (savedSize) {
        const selectedButton = [...document.querySelectorAll('.productInfoSizesSize')]
            .find(button => button.textContent.trim() === savedSize);
        if (selectedButton) {
            selectedButton.classList.add('active');
        }
    }
}

// Add click event listeners to each size button
document.querySelectorAll('.productInfoSizesSize').forEach(button => {
    button.addEventListener('click', function () {
        // Get the size from the clicked button
        const size = button.textContent.trim();

        // Update the selected size
        updateSelectedSize(size);
    });
});

// Load the selected size when the page is loaded
window.addEventListener('DOMContentLoaded', loadSelectedSize);

document.addEventListener('click', closeCartOnClickOutside);

function closeCartOnClickOutside(event) {
    var cartPopup = document.getElementById('cartPopup');

    // Проверяем, находится ли клик внутри корзины или на кнопке открытия
    if (!cartPopup.contains(event.target) && !event.target.closest('#openCartButton') && !event.target.closest('#closeCart')) {
        var computedStyle = window.getComputedStyle(cartPopup);
        var currentRight = computedStyle.right;

        if (currentRight === '0px') { // Корзина открыта
            cartPopup.style.right = '-370px';
            toggleBlurEffect(); // Снимаем размытие при закрытии корзины
        }
    }
}

function toggleCartn(event) {
    const cartPopup = document.getElementById('cartPopup');
    const currentRight = window.getComputedStyle(cartPopup).right;

    // Проверяем текущее положение корзины
    if (currentRight === '-370px') {
        // Если корзина закрыта, открываем её
        cartPopup.style.right = '0px';
        toggleBlurEffect();  // Включаем размытие
        loadCartData()
        updateContent();
        
    } else if (currentRight === '0px') {
        // Если корзина открыта, закрываем её
        cartPopup.style.right = '-370px';
        toggleBlurEffect();  // Отключаем размытие
        loadCartData()
    }

    event.stopPropagation();  // Останавливаем всплытие события
}

// Обновление содержимого корзины
function updateContent() {
    updateText();
    updateTitle();        
    loadCartData();
    showEmptyCartIfNecessary();
}

// Включение и отключение размытия фона и блокировка прокрутки
function toggleBlurEffect() {
    var filterCover = document.querySelector('.filterCover');
    var htmlElement = document.documentElement;

    // Проверяем, активен ли эффект размытия
    if (filterCover.classList.contains('blurred')) {
        filterCover.classList.remove('blurred');
        htmlElement.classList.remove('no-scroll');
    } else {
        filterCover.classList.add('blurred');
        htmlElement.classList.add('no-scroll');
    }
}

function showCartData() {
    const cartContent = document.getElementById('cartContent');
    
    if (cartContent) cartContent.style.display = 'block';

    const itemCount = document.querySelector('.productInfoCountInput').value;
    const itemPrice = document.querySelector('.productInfoPrice').innerText; 
    const cartSize = localStorage.getItem('selectedSize');
    const selectedImage = localStorage.getItem('selectedImage');
    const titleElement = document.querySelector('.item-details h3');
    const itemTitle = titleElement ? titleElement.innerText : "";

    // Create new item object
    const newItem = {
        id: 'item' + Date.now(), // Generate a unique ID
        count: itemCount,
        price: itemPrice,
        size: cartSize,
        total: (parseFloat(itemCount) * parseFloat(itemPrice.replace(' USD', ''))).toFixed(2) + ' USD',
        image: selectedImage,
        title: itemTitle
    };

    // Retrieve current cart items
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add new item to cart
    cartItems.push(newItem);

    // Update cart in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Open the cart
    toggleCartn(); // Открываем корзину при добавлении нового товара
    updateContent();
    // Load cart data

    
}

    function updateTitle() {
        // Получаем данные из localStorage и преобразуем их в массив объектов
        var arrayLocal = JSON.parse(localStorage.getItem('cartItems'));
        const selectedName = localStorage.getItem('savedProductName');
        
        // Проверяем, что arrayLocal — это массив
        if (Array.isArray(arrayLocal) && arrayLocal.length > 0) {
            const lastItem = arrayLocal[arrayLocal.length - 1]; // Получаем последний элемент массива
            
            // Проверяем, что последний элемент является объектом и не равен null
            if (typeof lastItem === 'object' && lastItem !== null) {
                // Проверяем, есть ли у объекта ключ 'title'
                if ('title' in lastItem) {
                    lastItem.title = selectedName; // Присваиваем новое значение ключу "title"
                }
            }
    
            // Сохраняем обновленный массив обратно в localStorage
            localStorage.setItem('cartItems', JSON.stringify(arrayLocal));
        }
    
        console.log(arrayLocal);

    }

    function loadCartData() {
        const language = localStorage.getItem('selectedLanguage') || 'en';

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const cartContent = document.getElementById('cartContent');
        if (!cartContent) {
            console.error('Cart container not found!');
            return;
        }

        cartContent.innerHTML = '';

        cartItems.forEach(itemData => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.setAttribute('data-id', itemData.id);

            const itemContent = `
                <div class="frame" id="cartImage">
                    ${itemData.image ? `<img src="../images/${itemData.image}" alt="${itemData.title}" class="basketData">` : ''}
                    <button class="itemCart" onclick="hideContent('${itemData.id}')">&#215;</button>
                </div>
                <ul class="item-details">
                    <li><h3 class="basketData" id="itemTitle">${itemData.title}</h3></li>
                    <li><p class="basketData">${langArr['emptyCartMessage'][language]}: <span class="basketData" id="cartSize">${itemData.size}</span></p></li>
                    <li><p class="dataColor">${langArr['cartItemCount'][language]}: <span class="basketData" id="itemCount">${itemData.count}</span></p></li>
                    <li><p class="dataColor">${langArr['cartItemPrice'][language]}: $<span class="basketData" id="itemPrice">${itemData.price}</span></p></li>
                    <li><p class="dataColor">Total: $<span class="basketData" id="itemTotal">${itemData.total}</span></p></li>
                    <li>
                        <div class="navabsolute">
                            <button onclick="updateItemCount('${itemData.id}', 1)">+</button>
                            <button onclick="updateItemCount('${itemData.id}', -1)">−</button>
                        </div>
                    </li>
                </ul>
            `;


            itemElement.innerHTML = itemContent;

            cartContent.appendChild(itemElement);
        });
    }
    function showEmptyCartIfNecessary() {
        // Получаем массив cartItems из локального хранилища
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        // Находим элемент с классом emptyShoppingCart
        const emptyCartDiv = document.querySelector('.emptyShoppingCart');
    
        // Показываем или скрываем элемент в зависимости от количества товаров в корзине
        if (cartItems.length === 0) {
            emptyCartDiv.style.display = 'block'; // Показываем сообщение о пустой корзине
        } else {
            emptyCartDiv.style.display = 'none'; // Скрываем сообщение о пустой корзине
        }
    }

/*
// Update the item count in the product info section
function updateItemCountProductInfoCounter(change) {
    const inputElement = document.querySelector('.productInfoCountInput');
    itemCount = Math.max(1, parseInt(inputElement.value) + change); // Ensure count is at least 1
    inputElement.value = itemCount;
    saveCountToLocalStorage(itemCount);
}

// Save the count to local storage
function saveCountToLocalStorage(count) {
    localStorage.setItem('savedCount', count);
}

// Update item count in the cart
function updateItemCount(itemId, countChange) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let item = cartItems.find(item => item.id === itemId);

    if (item) {
        item.count = Math.max(1, parseInt(item.count) + countChange);
        updateItemTotal(item); // Update total based on count and price
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update item count and total in the UI
        const itemElement = document.querySelector(`.item[data-id='${itemId}']`);
        if (itemElement) {
            itemElement.querySelector('.basketData#itemCount').textContent = item.count;
            itemElement.querySelector('.basketData#itemTotal').textContent = item.total;
        }

        updateCartTotal(); // Update total sum of the cart
    } else {
        console.error('Item not found in cart:', itemId);
    }
}

// Update item total based on its count and price
function updateItemTotal(itemData) {
    const numericPrice = parseFloat(itemData.price.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numericPrice)) {
        console.error('Failed to extract numeric value from price:', itemData.price);
        return;
    }

    itemData.total = (itemData.count * numericPrice).toFixed(2) + ' USD';

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === itemData.id);

    if (itemIndex !== -1) {
        cartItems[itemIndex] = itemData;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        updateItemPriceFromTotal(itemData.id);
    } else {
        console.error('Item not found in cart:', itemData.id);
    }
}

// Update item price from total
function updateItemPriceFromTotal(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let item = cartItems.find(item => item.id === itemId);

    if (item && item.total) {
        const numericTotal = parseFloat(item.total.replace(/[^0-9.-]+/g, ""));
        if (isNaN(numericTotal)) {
            console.error('Failed to extract numeric value from total:', item.total);
            return;
        }

        item.price = (numericTotal / item.count).toFixed(2) + ' USD';
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update price in the UI
        const itemElement = document.querySelector(`.item[data-id='${itemId}']`);
        if (itemElement) {
            itemElement.querySelector('.basketData#itemPrice').textContent = item.price;
        }
    } else {
        console.error('Item not found or no total available for item:', itemId);
    }
}

// Update item count from local storage on page load
function updateItemCountFromLocalStorage() {
    const savedCount = localStorage.getItem('savedCount');
    const cartItemsJson = localStorage.getItem('cartItems');

    let cartItems = [];
    try {
        cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
    } catch (error) {
        console.error('Error parsing cartItems from localStorage:', error);
        return;
    }

    if (!isNaN(parseInt(savedCount))) {
        cartItems.forEach(item => {
            if (!item.hasOwnProperty('updatedOnce')) {
                item.count = parseInt(savedCount);
                item.updatedOnce = true;
                updateItemTotal(item); // Ensure total is updated
            }
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Update item counts and prices in the UI
    const itemCountElements = document.querySelectorAll('.basketData#itemCount');
    itemCountElements.forEach(element => {
        const itemId = element.closest('.item').getAttribute('data-id');
        const item = cartItems.find(item => item.id === itemId);
        if (item) {
            element.textContent = item.count;
            element.closest('.item').querySelector('.basketData#itemTotal').textContent = item.total;
        }
    });
}

*/  
/* 
    function updateItemCount(uniqueId, change) {
        // Get cart items from local storage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        // Find the item to update
        cartItems = cartItems.map(item => {
            if (item.id === uniqueId) {
                item.count = Math.max(1, item.count + change); // Ensure count does not go below 1
                item.total = (parseFloat(item.count) * parseFloat(item.price)).toFixed(2);
            }
            return item;
        });
    
        // Save updated cart items to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    

    }


 

        function updatePriceFromLocalStorage() {
            var savedPrice = localStorage.getItem('savedPrice');
            if (savedPrice) {
                var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
                cartItems.forEach(function(itemData) {
                    if (!itemData.priceUpdated) { // Обновляем цену, только если она еще не установлена
                        var itemElement = document.querySelector(`.item[data-id="${itemData.id}"] .dataColor #itemPrice`);
                        if (itemElement) {
                            itemElement.textContent = savedPrice;
                            itemData.price = savedPrice;
                            itemData.priceUpdated = true; // Устанавливаем флаг, что цена обновлена
                        }
                    }
                });
        
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            }
        }

        });


 */
/*

// Функция для создания элемента корзины с данными о товаре
function createCartItem(data) {
    var cartItem = document.createElement('div');
    cartItem.classList.add('item');

    // Заполняем элемент корзины данными из объекта data
    var cartItemContent = `
        <div class="basketData">${data.image}</div>
        <div class="basketData">${data.count}</div>
        <div class="basketData">${data.price}</div>
        <div class="basketData">${data.size}</div>
        <div class="basketData">${data.total}</div>
        <h3  class="basketData">${data.title}</h3>
    `;
    cartItem.innerHTML = cartItemContent;

    return cartItem;
}

// Функция для обновления содержимого страницы после добавления товара в корзину


// Функция для загрузки данных корзины из локального хранилища
function loadCartData() {
    // Получаем массив товаров из локального хранилища 'cartItems'. Если данные отсутствуют, устанавливаем пустой массив.
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Находим контейнер корзины по его id 'cartBasket'
    var parent = document.getElementById('cartBasket');
    
    // Очищаем содержимое контейнера корзины перед загрузкой новых данных
    parent.innerHTML = '';

    // Перебираем каждый элемент в массиве cartItems
    cartItems.forEach(function(itemData) {
        // Создаем новый элемент корзины на основе данных товара с помощью функции createCartItem()
        var cartItem = createCartItem(itemData);
        
        // Добавляем созданный элемент корзины в контейнер корзины
        parent.appendChild(cartItem);
        
        // Очищаем содержимое элемента корзины (например, текст и изображения) с помощью функции clearBasketData()
        clearBasketData(cartItem);
    });
}
*/
/* 
// Добавляем обработчик события 'DOMContentLoaded', который сработает,
// когда начальная HTML-документация будет полностью загружена и разобрана.
document.addEventListener('DOMContentLoaded', function () {

    // Добавляем глобальный обработчик кликов для документа
    document.addEventListener('click', function (event) {
        // Получаем элемент, на который был произведён клик
        var clickedElement = event.target;
        
        // Находим элементы с классом '.filterCover' и '#cartPopup'
        var filterCover = document.querySelector('.filterCover');
        var cartPopup = document.querySelector('#cartPopup');

        // Получаем текущее значение CSS свойства 'filter' для элемента '.filterCover'
        var currentBlurValue = window.getComputedStyle(filterCover).getPropertyValue('filter');
        
        // Проверяем, был ли клик по элементу '.filterCover' и не был ли клик по элементу '#cartPopup'
        if (currentBlurValue === 'blur(5px)' && !cartPopup.contains(clickedElement)) {
            // Переключаем состояние корзины
            toggleCart();
        }
    });
});
*/
/*

// Обработчик для открытия корзины только по кнопке (или другому явному действию)
var openCartButton = document.getElementById('openCartButton');
if (openCartButton) {
    openCartButton.addEventListener('click', function(event) {
        event.stopPropagation(); // предотвращаем распространение события
        toggleCart(); // Открываем или закрываем корзину при нажатии на кнопку
    });
}

// Добавляем обработчик для закрытия корзины при клике вне её области
document.addEventListener('click', function(event) {
    var cartPopup = document.getElementById('cartPopup');

    // Проверяем, находится ли клик внутри корзины или на кнопке открытия
    if (!cartPopup.contains(event.target) && !event.target.closest('#openCartButton')) {
        if (cartPopup.classList.contains('open')) { // Корзина открыта
            toggleCart(); // Используем ту же функцию для закрытия
        }
    }
});

// Обработчик для открытия корзины только по кнопке (или другому явному действию)
var openCartButton = document.getElementById('openCartButton');
if (openCartButton) {
    openCartButton.addEventListener('click', function(event) {
        event.stopPropagation(); // предотвращаем распространение события
        toggleCart();
    });
}

// Проверяем наличие элемента с id 'openCartButton' перед добавлением обработчика
var openCartButton = document.getElementById('openCartButton');
if (openCartButton) {
    openCartButton.addEventListener('click', function() {
        toggleCart();
    });
}
// Добавляем обработчик для закрытия корзины при клике вне её области
document.addEventListener('click', function(event) {
    var cartPopup = document.getElementById('cartPopup');

    // Проверяем, находится ли клик внутри корзины или на кнопке открытия
    if (!cartPopup.contains(event.target) && !event.target.closest('#openCartButton')) {
        var computedStyle = window.getComputedStyle(cartPopup);
        var currentRight = computedStyle.right;

        if (currentRight === '0px') { // Корзина открыта
            closeCart();
        }
    }
});
// Function to update the cart total
function updateCartTotal() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalAmount = 0;

    cartItems.forEach(item => {
        const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        totalAmount += item.count * numericPrice;
    });

    document.getElementById('total-items').innerText = totalAmount.toFixed(2) + ' USD';
    document.getElementById('total-amount').innerText = totalAmount.toFixed(2) + ' USD';
}

// Initialize item count and totals on page load
document.addEventListener('DOMContentLoaded', () => {
    updateItemCountFromLocalStorage();
    updateCartTotal();

    const savedCount = localStorage.getItem('savedCount');
    if (savedCount) {
        document.querySelector('.productInfoCountInput').value = savedCount;
    }
});

*/
