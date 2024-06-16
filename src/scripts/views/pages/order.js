document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Mengambil token dari local storage
    const token = localStorage.getItem("accessToken");

    // Mengambil data checkout dari server
    const response = await fetch('http://localhost:3000/api/checkout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Gagal mengambil data checkout dari server');
    }

    const checkouts = await response.json();
    const latestCheckout = checkouts[checkouts.length - 1];

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
      <p><strong>Total:</strong> ${latestCheckout.total}</p>
    `;

    // Membuat tombol konfirmasi pesanan
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm Order";
    confirmButton.classList.add("confirm-button");
    orderSummaryElement.appendChild(confirmButton);

    // Menambahkan event listener untuk tombol konfirmasi
    confirmButton.addEventListener("click", function () {
      // Menghapus data cart dan order dari local storage setelah konfirmasi
      localStorage.removeItem("cart");

      // Menyiapkan data untuk history
      const history = {
        customer: latestCheckout.customer,
        shipping: latestCheckout.shipping,
        items: latestCheckout.items,
        total: latestCheckout.total,
        date: new Date().toLocaleDateString("en-US"),
      };

      // Mendapatkan riwayat pembelian yang sudah ada atau membuat yang baru
      const existingHistory = JSON.parse(localStorage.getItem("history")) || [];
      existingHistory.push(history);

      // Menyimpan kembali riwayat pembelian ke local storage
      localStorage.setItem("history", JSON.stringify(existingHistory));

      // Mengarahkan kembali pengguna ke halaman utama (index.html)
      alert('Order berhasil dibuat');
      // window.location.href = "index.html";
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
  }
});
