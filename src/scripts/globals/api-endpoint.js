import CONFIG from './config';

const API_ENDPOINT = {
  LIST_PRODUCTS: `${CONFIG.BASE_URL}/products`,
  DETAIL: (idProduct) => `${CONFIG.BASE_URL}/products/${idProduct}`,
};

export default API_ENDPOINT;
