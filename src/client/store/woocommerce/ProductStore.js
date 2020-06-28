import { observable, action } from 'mobx';
import Api from '../../api';

export default class ProductStore {
  @observable product;

  @action
  getProduct(id) {
    return Api.Woocommerce.Product(id).then((res) => {
      if (res.data) {
        this.setProduct(res.data);
      }
    });
  }

  @action
  setProduct = (data) => {
    this.product = data;
  };
}
