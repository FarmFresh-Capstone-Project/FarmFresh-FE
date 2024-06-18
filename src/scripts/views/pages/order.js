document.addEventListener("DOMContentLoaded", async function () {
  try {
    const token = localStorage.getItem("accessToken");
    const checkoutId = localStorage.getItem("checkoutId");

    if (!checkoutId) {
      throw new Error('checkoutId tidak tersedia di localStorage');
    }

    const response = await fetch(`http://localhost:3000/api/checkout/${checkoutId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Gagal mengambil data checkout dari server');
    }

    const latestCheckout = await response.json();

    let total = latestCheckout.total.replace("Rp", "").replace(".", "").replace(",", ".").trim();
    total = `Rp${parseFloat(total).toLocaleString('id-ID')}`;

    const orderSummaryElement = document.getElementById("order-summary");

    orderSummaryElement.innerHTML = `
      <h2>Order Details:</h2>
      <p><strong>Name:</strong> ${latestCheckout.customer.name}</p>
      <p><strong>Email:</strong> ${latestCheckout.customer.email}</p>
      <p><strong>Phone:</strong> ${latestCheckout.customer.phone}</p>
      <p><strong>City:</strong> ${latestCheckout.customer.city}</p>
      <p><strong>Address:</strong> ${latestCheckout.customer.address}</p>
      <p><strong>Postal Code:</strong> ${latestCheckout.customer.postalCode}</p>
      <p><strong>Country:</strong> ${latestCheckout.customer.country}</p>
      <p><strong>Shipping Name:</strong> ${latestCheckout.shipping.name}</p>
      <p><strong>Shipping Address:</strong> ${latestCheckout.shipping.address}</p>
      <p><strong>Shipping City:</strong> ${latestCheckout.shipping.city}</p>
      <p><strong>Shipping Postal Code:</strong> ${latestCheckout.shipping.postalCode}</p>
      <p><strong>Shipping Country:</strong> ${latestCheckout.shipping.country}</p>
      <p><strong>Shipping Phone:</strong> ${latestCheckout.shipping.phone}</p>
      <p><strong>Total:</strong> ${total}</p>
    `;

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm Order";
    confirmButton.classList.add("confirm-button");
    orderSummaryElement.appendChild(confirmButton);

    confirmButton.addEventListener("click", async function () {
      try {
        const deleteCartResponse = await fetch(`http://localhost:3000/api/carts`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!deleteCartResponse.ok) {
          throw new Error('Gagal menghapus data cart dari server');
        }

        localStorage.removeItem("checkoutId");

        alert('Order berhasil dibuat');
        window.location.href = "index.html";
      } catch (error) {
        console.error("Terjadi kesalahan saat mengonfirmasi order:", error.message);
      }
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
  }
});
