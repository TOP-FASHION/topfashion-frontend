import { observable, action } from 'mobx';
import Api from '../../api';
import { stores } from '../context';

export default class CartAddProductStore {
  @observable isProductAddCart;

  @observable product_id;

  constructor() {
    this.isProductAddCart = false;
  }

  @action.bound
  addProduct(data, quantity) {
    const postData = {};
    postData.product_id = data;
    this.product_id = postData.product_id;
    postData.quantity = quantity || 1;
    postData.return_cart = true;
    return Api.CoCart.CartAddProduct(postData)
      .then((res) => {
        this.setProductAfterAddCart(res.data);
        stores.cartInfoTotalProductsStore.getProductsCartInfoTotal();
        stores.cartCountProductsStore.getProductsCartCountItems();
        this.isProductAddCart = true;
        return res.data;
      })
      .catch((error) => {
        console.log('Error====', error);
      });
  }

  @action
  setProductAfterAddCart = (data) => {
    stores.cartProductsStore.productsCart = data;
  };

  get productId() {
    return this.product_id;
  }

  clear() {
    this.product_id = '';
    this.isProductAddCart = false;
  }
}
