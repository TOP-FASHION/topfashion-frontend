import { observable, action } from 'mobx';
import Api from "../utils/Api/"

class ProductsStore {
  @observable products;

  constructor() {
    this.products = {};
  }

  @action getProducts(param) {
    Api.products(param).then((res) => {
      if (res) {
        this.products = res;
      }
    })
  }

}

export default new ProductsStore();