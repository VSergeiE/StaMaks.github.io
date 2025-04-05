document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('myModal');
  const btn = document.getElementById('openModalBtn');
  const span = document.getElementsByClassName('close')[0];
  const form = document.getElementById('orderForm');
  const modalItemsList = document.getElementById('modal-items-list');
  const modalTotal = document.getElementById('modal-total');

  function showOrderItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    modalItemsList.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'modal-item';
      li.innerHTML = `
        <span>${item.name}</span>
        <span>${item.quantity} шт.</span>
        <span>${item.price} руб.</span>
        <span>${(item.quantity * item.price).toFixed(2)} руб.</span>
      `;
      modalItemsList.appendChild(li);
      total += item.quantity * item.price;
    });
    
    modalTotal.textContent = total.toFixed(2);
  }

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    showOrderItems();
    modal.style.display = "block";
  });

  span.addEventListener('click', function() {
    modal.style.display = "none";
  });

  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const formData = {
      customer: {
        fio: document.getElementById('fio').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        dostavka: document.getElementById('dostavka').value,
        comments: document.getElementById('comments').value
      },
      order: cart,
      total: modalTotal.textContent
    };

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzCxwulPiOQnJd2agUG4tsV-VwNhuPNZI9itc-dF0tcHZBqISMuMdV9_nrR6fYRiW2i/exec';

    localStorage.removeItem('cart');
    fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors', // добавьте эту строку
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    .catch(error => {
      console.error('Fetch error:', error);
      alert(`Ошибка отправки: ${error.message}`);
    });
    alert('Заказ оформлен! Мы свяжемся с вами.');
    form.reset();
  });
});