document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('deliveryForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Отменяем стандартное поведение формы
    document.querySelectorAll('.large-input').forEach(input => input.classList.remove('error'));

    const name = document.getElementById('name').value;
    const deviceNumber = document.getElementById('deviceNumber').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;
    
     // Проверка на пустые поля
  if (isFieldEmpty(name)) {
    alert('Поле "ФИО" не может быть пустым.');
    document.getElementById('name').classList.add('error');
    return;
  }

  if (isFieldEmpty(deviceNumber)) {
    alert('Поле "Номер прибора" не может быть пустым.');
    document.getElementById('deviceNumber').classList.add('error');
    return;
  }

  if (isFieldEmpty(phone)) {
    alert('Поле "Номер телефона" не может быть пустым.');
    document.getElementById('phone').classList.add('error');
    return;
  }

  if (!isNumber(phone)) {
    alert('Номер телефона должен содержать только цифры.');
    document.getElementById('phone').classList.add('error');
    return;
  }

  if (isFieldEmpty(address)) {
    alert('Поле "Адрес доставки" не может быть пустым.');
    document.getElementById('address').classList.add('error');
    return;
  }

  if (!deliveryMethod) {
    alert('Выберите способ доставки.');
    return;
  }
    const data = {
      name: name,
      deviceNumber: deviceNumber,
      phone: phone,
      address: address,
      deliveryMethod: deliveryMethod
    };

    // URL вашего Google Apps Script
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwvj9kf96HbMcmI59Vl5TY0O5R31l2x2MKaZndjLkZ3F3QULtxVAwv_KI-1ycjeKzqy/exec';

    fetch(scriptUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })
    alert('Данные успешно отправлены!');
    document.getElementById('deliveryForm').reset() // Сброс всей формы
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Данные успешно отправлены!');
          
        } else {
          alert('Ошибка при отправке данных: ' + data.error);
        }
      });
  });
});
// Функция для проверки, что строка состоит только из цифр
function isNumber(value) {
  return /^\d+$/.test(value);
}

// Функция для проверки, что поле не пустое
function isFieldEmpty(value) {
  return value.trim() === '';
}