// Fungsi untuk memperbarui jumlah item di ikon keranjang
async function updateCartItemCount() {
  try {
    const response = await fetch('http://localhost:3000/api/carts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    const data = await response.json();
    const itemCount = data.cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-item-count').textContent = itemCount;
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil item keranjang:', error);
  }
}

// Fungsi untuk memperbarui item di keranjang
async function updateCartItem(itemId, quantity) {
  try {
    const response = await fetch(`http://localhost:3000/api/carts/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ quantity })
    });
    const data = await response.json();
    updateCartItemCount();
  } catch (error) {
    console.error('Terjadi kesalahan saat memperbarui item di keranjang:', error);
  }
}

// Fungsi untuk memperbarui quantity item di keranjang
async function updateCartItemQuantity(inputElement) {
  const itemId = inputElement.dataset.itemId;
  const quantity = parseInt(inputElement.value, 10);

  try {
    const response = await fetch(`http://localhost:3000/api/carts/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ quantity })
    });
    const data = await response.json();
    updateCartItemCount();
    displayCartItems();
  } catch (error) {
    console.error('Terjadi kesalahan saat memperbarui kuantitas item di keranjang:', error);
  }
}

// Fungsi untuk menambahkan item ke keranjang
async function addToCart(productId, productName) {
  const quantityInput = document.querySelector(`#vegetable-item-${productId} .vegetable-item__content__quantity`);
  const quantity = parseInt(quantityInput.value, 10);

  try {
    const response = await fetch('http://localhost:3000/api/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ productId, quantity })
    });
    const data = await response.json();
    updateCartItemCount();
  } catch (error) {
    console.error('Terjadi kesalahan saat menambahkan item ke keranjang:', error);
  }
}

// Fungsi untuk menampilkan item di keranjang
async function displayCartItems() {
  try {
    const response = await fetch('http://localhost:3000/api/carts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    const data = await response.json();
    const cartItems = data.cartItems;
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    let total = 0;
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
      const itemTotalPrice = parseFloat(item.totalPrice.replace('Rp', '').replace(/\./g, '').replace(',', '.'));
      total += itemTotalPrice;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td><input type="number" class="item-quantity" value="${item.quantity}" min="1" data-item-id="${item.itemId}" onchange="updateCartItemQuantity(this)"></td>
        <td>${item.price}</td>
        <td>${item.totalPrice}</td>
        <td><button onclick="deleteCartItem('${item.itemId}')">Delete</button></td>
      `;
      cartItemsContainer.appendChild(row);
    });

    cartTotal.textContent = `Rp${total.toLocaleString()}`;
  } catch (error) {
    console.error('Terjadi kesalahan saat menampilkan item keranjang:', error);
  }
}

// Fungsi untuk menghapus item dari keranjang
async function deleteCartItem(itemId) {
  try {
    const response = await fetch(`http://localhost:3000/api/carts/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    const data = await response.json();
    updateCartItemCount();
    displayCartItems();
  } catch (error) {
    console.error('Terjadi kesalahan saat menghapus item dari keranjang:', error);
  }
}

// Memanggil fungsi-fungsi berikut saat halaman dimuat untuk pertama kalinya
document.addEventListener('DOMContentLoaded', () => {
  updateCartItemCount();
  displayCartItems();
});

// Memastikan fungsi-fungsi berikut tersedia di scope global
window.addToCart = addToCart;
window.updateCartItemCount = updateCartItemCount;
window.displayCartItems = displayCartItems;
window.updateCartItem = updateCartItem;
window.deleteCartItem = deleteCartItem;
window.updateCartItemQuantity = updateCartItemQuantity;