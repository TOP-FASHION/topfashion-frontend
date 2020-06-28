import { observable, action, computed, toJS } from 'mobx';
import Api from '../../api';

export default class ProductsStore {
  @observable products = [];

  @observable allLoadedProducts = [];

  @observable totalProducts;

  @observable pagesProducts;

  @observable countProducts = 12;

  @observable isLoadingProducts = false;

  @action
  getProducts(data) {
    this.isLoadingProducts = true;
    return Api.Woocommerce.Products(data).then((res) => {
      if (res.data) {
        this.isLoadingProducts = false;
        this.setProducts(res.data);

        this.totalProducts = res.headers['x-wp-total'];
        this.pagesProducts = res.headers['x-wp-totalpages'];
        return res.data;
      }
    });
  }

  @action
  setProducts = (data) => {
    this.products = data;
  };

  @computed
  get allProducts() {
    return this.allLoadedProducts.concat(toJS(this.products));
  }
}
