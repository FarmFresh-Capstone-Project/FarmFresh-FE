const createVegetableItemTemplate = (vegetable) => `
  <!-- Vegetables List -->
  <div class="vegetable-item" id="vegetable-item-${vegetable.idProduct}" data-price="${vegetable.price}">
      <div class="vegetable-item__header">
          <img class="vegetable-item__header__image" alt="${vegetable.name}" src="${vegetable.image}">
          <div class="vegetable-item__content__store">${vegetable.category}</div>
          <div class="vegetable-item__header__rating">
              <p>⭐️<span class="vegetable-item__header__rating__score">${vegetable.rate}</span></p>
          </div>
      </div>
      <div class="vegetable-item__content">
          <h3><a href="#/detail/${vegetable.idProduct}">${vegetable.name}</a></h3>
          <h3>${vegetable.price}</h3>
          <p class="vegetable-item__content__description">${vegetable.description}</p>
          <input type="number" class="vegetable-item__content__quantity" value="1" min="1">
          <button class="vegetable-item__content__button" onclick="addToCart('${vegetable.idProduct}', '${vegetable.name}', this)">Add to Cart</button>
      </div>
  </div>
`;

const createProductDetailTemplate = (product) => `
  <div class="container">
    <section class="product-detail">
      <div class="farmer-info">
        <div class="farmer-image-container">
          <div class="farmer-image" style="background-image: url('${product.image}')"></div>
          <button class="check-store-button">Cek Toko</button>
        </div>
        <div class="product-details">
          <h2>Detail</h2>
          <p class="product-name">${product.name}</p>
          <p class="product-type">${product.type}</p>
          <div class="organic-level">
            <h3>Tingkat Keorganisasian</h3>
            <p class="product-category">${product.category}</p>
            <p class="product-desc">${product.description}</p>
          </div>
        </div>
      </div>
      <div class="product-info">
        <h2>${product.name}</h2>
        <div class="price">
          <span class="current-price">${product.price}</span> / 1 kg
        </div>
        <div class="rating">
          <span class="star">★</span>
          <span class="rating-value">${product.rate}</span>
          <span class="review-count">(20)</span>
        </div>
        <button class="buy-button">Beli</button>
        <button class="share-button">Share</button>
      </div>
    </section>
    <section class="related-products">
      <h3>Sering dibeli bersama</h3>
      <div class="related-product-list">
        <div class="related-product-item"></div>
        <div class="related-product-item"></div>
        <div class="related-product-item"></div>
      </div>
    </section>
  </div>
`;

const createCartItemTemplate = (item) => `
  <div class="cart-item" id="cart-item-${item.idProduct}">
    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
    <div class="cart-item-details">
      <h3>${item.name}</h3>
      <p>Rp${item.price}</p>
      <input type="number" value="${item.quantity}" min="1" class="cart-item-quantity" data-id="${item.idProduct}">
      <button class="remove-cart-item" data-id="${item.idProduct}">Remove</button>
    </div>
  </div>
`;

export {
  createVegetableItemTemplate,
  createProductDetailTemplate,
  createCartItemTemplate,
};
