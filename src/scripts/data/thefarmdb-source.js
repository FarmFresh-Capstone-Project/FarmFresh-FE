import API_ENDPOINT from '../globals/api-endpoint';

class TheFarmDbSource {
  static async listProducts() {
    const response = await fetch(API_ENDPOINT.LIST_PRODUCTS);
    const products = await response.json();
    return products;
  }

  static async detailProducts(idProduct) {
    const response = await fetch(API_ENDPOINT.DETAIL(idProduct));
    const products = await response.json();
    return products;
  }
}

export default TheFarmDbSource;
