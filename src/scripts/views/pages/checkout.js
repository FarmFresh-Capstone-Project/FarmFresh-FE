// Fungsi untuk menampilkan item di checkout
async function displayCheckoutItems() {
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
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const subTotal = document.getElementById('stotal');
    
    let total = 0;
    checkoutItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
      const itemTotalPrice = parseFloat(item.totalPrice.replace('Rp', '').replace(/\./g, '').replace(',', '.'));
      total += itemTotalPrice;

      const row = document.createElement('tr');
      row.setAttribute('data-product-id', item.productId);
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td>${item.totalPrice}</td>
      `;
      checkoutItemsContainer.appendChild(row);
    });

    subTotal.textContent = `Rp${total.toLocaleString()}`;
  } catch (error) {
    console.error('Terjadi kesalahan saat menampilkan item keranjang di checkout:', error);
  }
}

// Fungsi untuk memasukkan negara
function populateCountryDropdown() {
  const defaultCountries = ["Indonesia", "Inggris", "China", "Taiwan", "Jepang", "Korea"];
  const countrySelects = document.querySelectorAll('select[id$="country"]');
  
  countrySelects.forEach(select => {
    defaultCountries.forEach((country) => {
      const option = document.createElement("option");
      option.text = country.toUpperCase();
      option.value = country.toUpperCase();
      select.add(option);
    });
  });
}

// Fungsi copy details ke shipping details jika checkbox dicentang
function copyBillingToShipping() {
  const isChecked = document.getElementById('same-as-billing').checked;
  
  if (isChecked) {
    document.getElementById('shipping-name').value = document.getElementById('name').value;
    document.getElementById('shipping-address').value = document.getElementById('address').value;
    document.getElementById('shipping-city').value = document.getElementById('city').value;
    document.getElementById('shipping-postal-code').value = document.getElementById('postal-code').value;
    document.getElementById('shipping-country').value = document.getElementById('country').value;
    document.getElementById('shipping-phone').value = document.getElementById('phone').value;
  } else {
    document.getElementById('shipping-name').value = '';
    document.getElementById('shipping-address').value = '';
    document.getElementById('shipping-city').value = '';
    document.getElementById('shipping-postal-code').value = '';
    document.getElementById('shipping-country').value = '';
    document.getElementById('shipping-phone').value = '';
  }
}

// Fungsi untuk menambahkan data ke checkout
async function submitCheckout(e) {
  e.preventDefault();

  const customer = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    postalCode: document.getElementById('postal-code').value,
    country: document.getElementById('country').value
  };

  const shipping = {
    name: document.getElementById('shipping-name').value,
    address: document.getElementById('shipping-address').value,
    city: document.getElementById('shipping-city').value,
    postalCode: document.getElementById('shipping-postal-code').value,
    country: document.getElementById('shipping-country').value,
    phone: document.getElementById('shipping-phone').value
  };

  const items = Array.from(document.querySelectorAll('#checkout-items tr')).map(row => {
    const [name, quantity, price, totalPrice] = row.children;
    const productId = row.getAttribute('data-product-id');
    return {
      productId,
      name: name.textContent,
      quantity: parseInt(quantity.textContent),
      price: price.textContent,
      totalPrice: totalPrice.textContent
    };
  });

  const total = parseFloat(document.getElementById('stotal').textContent.replace('Rp', '').replace(/\./g, '').replace(',', '.'));
  const formattedTotal = `${total.toLocaleString('id-ID')}`;

  const formData = new FormData();
  formData.append('customer[name]', customer.name);
  formData.append('customer[email]', customer.email);
  formData.append('customer[phone]', customer.phone);
  formData.append('customer[address]', customer.address);
  formData.append('customer[city]', customer.city);
  formData.append('customer[postalCode]', customer.postalCode);
  formData.append('customer[country]', customer.country);

  formData.append('shipping[name]', shipping.name);
  formData.append('shipping[address]', shipping.address);
  formData.append('shipping[city]', shipping.city);
  formData.append('shipping[postalCode]', shipping.postalCode);
  formData.append('shipping[country]', shipping.country);
  formData.append('shipping[phone]', shipping.phone);

  items.forEach((item, index) => {
    formData.append(`items[${index}][productId]`, item.productId);
    formData.append(`items[${index}][name]`, item.name);
    formData.append(`items[${index}][quantity]`, item.quantity);
    formData.append(`items[${index}][price]`, item.price);
    formData.append(`items[${index}][totalPrice]`, item.totalPrice);
  });
  formData.append('total', formattedTotal);
  formData.append('image', document.getElementById('image').files[0]);

  try {
    const response = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      alert('Checkout berhasil dibuat');
      window.location.href = 'order.html';
    } else {
      console.error('Kesalahan saat membuat checkout:', result);
      alert('Kesalahan: ' + result.error);
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat mengirim data checkout:', error);
  }
}

document.getElementById('checkout-order-form').addEventListener('submit', submitCheckout);

// Memanggil fungsi-fungsi berikut saat halaman dimuat untuk pertama kalinya
document.addEventListener('DOMContentLoaded', () => {
  displayCheckoutItems();
  populateCountryDropdown();
  document.getElementById('same-as-billing').addEventListener('change', copyBillingToShipping);
});
