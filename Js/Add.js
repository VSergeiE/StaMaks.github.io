document.addEventListener('DOMContentLoaded', function () {
  const cartCount = document.getElementById('cart-count');// Элемент для отображения количества товаров в корзине
  const quantityInput = document.getElementById('quantity');
  const minusButton = document.querySelector('.quantity-minus');
  const plusButton = document.querySelector('.quantity-plus');

  // Загрузка корзины из localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();

  // Обработчик для кнопок "Добавить в корзину"
  document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', function () {
      const productName = button.getAttribute('data-name'); // ID товара
      const productPrice = parseInt(button.getAttribute('data-price')); // Цена товара
      const quantity =  1; // Количество

      // Проверяем, есть ли товар уже в корзине
      const existingProduct = cart.find(item => item.name === productName);

      if (existingProduct) {
        // Если товар уже есть, увеличиваем количество
        existingProduct.quantity += quantity;
      } else {
        // Если товара нет, добавляем его в корзину
        cart.push({  
          name: productName, 
          price: productPrice, 
          quantity  });
      }

      // Сохраняем корзину в localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert(`Товар "${productName}" добавлен в корзину!`); // Уведомление пользователя
    });
  });

  // Обработчик для кнопки "-"
  minusButton.addEventListener('click', function () {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
      quantityInput.value = value - 1;
    }
  });

  // Обработчик для кнопки "+"
  plusButton.addEventListener('click', function () {
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
  });

  // Функция для обновления счетчика корзины
  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
});