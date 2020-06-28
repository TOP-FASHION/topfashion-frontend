import { decorate, observable, action, autorun, runInAction } from 'mobx';
import Api from '../../api';

export default class CartInfoTotalProductsStore {
  productsCartInfoTotal;

  constructor() {
    autorun(() => this.getProductsCartInfoTotal());
  }

  getProductsCartInfoTotal() {
    return Api.CoCart.CartInfoTotalProducts().then((res) => {
      if (res) {
        runInAction(() => {
          this.setProductsCartInfoTotal(res.data);
        });
      }
    });
  }

  setProductsCartInfoTotal = (data) => {
    this.productsCartInfoTotal = data;
  };
}

decorate(CartInfoTotalProductsStore, {
  productsCartInfoTotal: observable,
  setData: action,
});
