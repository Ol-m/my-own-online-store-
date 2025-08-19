let itemCount = 1;

// Функция для обновления количества товаров в разделе информации о продукте
function updateItemCountProductInfoCounter(change) {
    const inputElement = document.querySelector('.productInfoCountInput'); // Находим элемент ввода количества товаров
    itemCount = Math.max(1, parseInt(inputElement.value) + change); // Увеличиваем или уменьшаем количество, минимальное значение — 1
    inputElement.value = itemCount; // Обновляем значение в поле ввода
    saveCountToLocalStorage(itemCount); // Сохраняем новое количество в локальное хранилище
}

// Функция для сохранения количества товаров в локальное хранилище
function saveCountToLocalStorage(count) {
    localStorage.setItem('savedCount', count); // Сохраняем значение в локальное хранилище с ключом 'savedCount'
}



// Функция для обновления общей стоимости товара на основе количества и цены
function updateItemTotal(itemData) {
    const numericPrice = parseFloat(itemData.price.replace(/[^0-9.-]+/g, "")); // Преобразуем строку цены в число
    if (isNaN(numericPrice)) {
        console.error('Failed to extract numeric value from price:', itemData.price); // Логируем ошибку, если цена не валидна
        return;
    }

    itemData.total = (itemData.count * numericPrice).toFixed(2) + ' USD'; // Рассчитываем общую стоимость товара

    // Обновляем данные товара в локальном хранилище
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === itemData.id);

    if (itemIndex !== -1) {
        cartItems[itemIndex] = itemData; // Обновляем данные товара в массиве
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Сохраняем изменения в локальное хранилище

        // Убедимся, что цена обновляется, если необходимо
        updateItemPriceFromTotal(itemData.id);
    } else {
        console.error('Item not found in cart:', itemData.id); // Логируем ошибку, если товар не найден
    }
}

// Функция для обновления цены товара на основе его общей стоимости
function updateItemPriceFromTotal(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Загружаем данные корзины
    let item = cartItems.find(item => item.id === itemId); // Находим товар

    if (item && item.total) {
        const numericTotal = parseFloat(item.total.replace(/[^0-9.-]+/g, "")); // Преобразуем строку общей стоимости в число
        if (isNaN(numericTotal)) {
            console.error('Failed to extract numeric value from total:', item.total); // Логируем ошибку
            return;
        }

        item.price = (numericTotal / item.count).toFixed(2) + ' USD'; // Пересчитываем цену товара на единицу

        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Сохраняем изменения в локальное хранилище

        // Обновляем цену в пользовательском интерфейсе
        const itemElement = document.querySelector(`.item[data-id='${itemId}']`);
        if (itemElement) {
            itemElement.querySelector('.basketData#itemPrice').textContent = item.price; // Обновляем цену
        }
    } else {
        console.error('Item not found or no total available for item:', itemId); // Логируем ошибку
    }
}

// Функция для обновления количества товаров из локального хранилища при загрузке страницы
function updateItemCountFromLocalStorage() {
    const savedCount = localStorage.getItem('savedCount'); // Загружаем сохраненное количество товаров
    const cartItemsJson = localStorage.getItem('cartItems'); // Загружаем данные корзины

    let cartItems = [];
    try {
        cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : []; // Парсим данные корзины
    } catch (error) {
        console.error('Error parsing cartItems from localStorage:', error); // Логируем ошибку
        return;
    }

    if (!isNaN(parseInt(savedCount))) {
        cartItems.forEach(item => {
            if (!item.hasOwnProperty('updatedOnce')) { // Проверяем, не обновлялся ли товар ранее
                item.count = parseInt(savedCount); // Обновляем количество
                item.updatedOnce = true; // Флаг, что обновление выполнено
                updateItemTotal(item); // Пересчитываем общую стоимость товара
            }
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Сохраняем изменения в локальное хранилище
    }

    // Обновляем отображение количества и стоимости в пользовательском интерфейсе
    const itemCountElements = document.querySelectorAll('.basketData#itemCount');
    itemCountElements.forEach(element => {
        const itemId = element.closest('.item').getAttribute('data-id'); // Получаем идентификатор товара
        const item = cartItems.find(item => item.id === itemId); // Находим товар
        if (item) {
            element.textContent = item.count; // Обновляем количество
            element.closest('.item').querySelector('.basketData#itemTotal').textContent = item.total; // Обновляем стоимость
        }
    });
}

// Функция для обновления общей суммы корзины
function updateCartTotal() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Загружаем данные корзины
    let totalAmount = 0;

    cartItems.forEach(item => {
        const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Преобразуем строку цены в число
        totalAmount += item.count * numericPrice; // Суммируем стоимость всех товаров
    });

    document.getElementById('total-items').innerText = totalAmount.toFixed(2) + ' USD'; // Отображаем общее количество
    document.getElementById('total-amount').innerText = totalAmount.toFixed(2) + ' USD'; // Отображаем общую сумму
}

// Инициализация данных при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateItemCountFromLocalStorage(); // Обновляем данные из локального хранилища
    updateCartTotal(); // Пересчитываем общую сумму корзины

    const savedCount = localStorage.getItem('savedCount'); // Загружаем сохраненное количество товаров
    if (savedCount) {
        document.querySelector('.productInfoCountInput').value = savedCount; // Устанавливаем количество в поле ввода
    }
});


function updateCartTotalAfterRemoval(uniqueId) {
    // Получаем массив товаров из локального хранилища
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Проверяем наличие товара с данным ID
    const removedItem = cartItems.find(item => item.id === uniqueId);

    if (removedItem) {
        // Извлекаем числовую сумму удаляемого товара
        const numericTotal = parseFloat(removedItem.total.replace(/[^0-9.-]+/g, ""));

        if (!isNaN(numericTotal)) {
            // Уменьшаем общую сумму корзины
            let totalAmountElement = document.getElementById('total-amount');
            let totalItemsElement = document.getElementById('total-items');

            if (totalAmountElement && totalItemsElement) {
                let totalAmount = parseFloat(totalAmountElement.innerText.replace(/[^0-9.-]+/g, ""));
                totalAmount = Math.max(0, totalAmount - numericTotal); // Убедимся, что итоговая сумма не станет отрицательной

                // Обновляем отображение общей суммы
                totalAmountElement.innerText = totalAmount.toFixed(2) + ' USD';
                totalItemsElement.innerText = totalAmount.toFixed(2) + ' USD';
            } else {
                console.error('Total amount elements not found in DOM');
            }
        } else {
            console.error('Failed to extract numeric value from removed item total:', removedItem.total);
        }
    } else {
        console.error('Removed item not found in cartItems:', uniqueId);
    }
}



function hideContent(uniqueId) {
    // Получаем контейнер для отображения корзины
    const cartContent = document.getElementById('cartContent');

    // Ищем элемент товара по его уникальному ID
    const itemElement = cartContent.querySelector(`.item[data-id="${uniqueId}"]`);

    // Удаляем элемент из отображения корзины
    if (itemElement) {
        itemElement.style.display = 'none';
    }

    // Получаем массив товаров из локального хранилища
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Удаляем товар из массива по уникальному ID
    cartItems = cartItems.filter(item => item.id !== uniqueId);

    // Обновляем локальное хранилище
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Обновляем общую сумму корзины после удаления
    updateCartTotalAfterRemoval(uniqueId, '======');

    // Проверяем, пустая ли корзина, после удаления
    showEmptyCartIfNecessary();

}

// Функция для обновления количества товаров в корзине
function updateItemCount(itemId, countChange) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Загружаем данные корзины из локального хранилища или создаем пустой массив
    let item = cartItems.find(item => item.id === itemId); // Находим товар по его идентификатору

    if (item) {
        // Обновляем количество товара, минимальное значение — 1
        item.count = Math.max(1, parseInt(item.count) + countChange);
        updateItemTotal(item); // Обновляем общую стоимость товара

        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Сохраняем обновленные данные в локальное хранилище

        // Обновляем количество и стоимость в пользовательском интерфейсе
        const itemElement = document.querySelector(`.item[data-id='${itemId}']`);
        if (itemElement) {
            itemElement.querySelector('.basketData#itemCount').textContent = item.count; // Обновляем количество
            itemElement.querySelector('.basketData#itemTotal').textContent = item.total; // Обновляем общую стоимость
        }

        updateCartTotal(); // Пересчитываем общую стоимость корзины
    } else {
        console.error('Item not found in cart:', itemId); // Логируем ошибку, если товар не найден
    }
}