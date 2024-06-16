import UrlParser from '../../routes/url-parser';
import farmSource from '../../data/thefarmdb-source';
import { createProductDetailTemplate } from '../templates/template-creator';

const DetailPage = {
  async render() {
    return `
      <div id="product-detail-container" class="product-detail-container"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const productId = url.id;
    const product = await farmSource.detailProducts(productId);

    console.log(product);

    const productDetailContainer = document.getElementById('product-detail-container');
    productDetailContainer.innerHTML = createProductDetailTemplate(product);
  },
};

export default DetailPage;
