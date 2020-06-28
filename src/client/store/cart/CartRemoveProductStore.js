import { observable, action } from 'mobx';
import Api from '../../api';
import { stores } from '../context';

export default class CartRemoveProductStore {
  @observable isProductRemoveCart;

  @observable cart_item_key;

  constructor() {
    this.isProductRemoveCart = false;
  }

  @action.bound
  removeProductCart(data) {
    const postData = {};
    postData.cart_item_key = data;
    this.cart_item_key = postData.cart_item_key;
    postData.return_cart = true;
    return Api.CoCart.CartRemoveProduct(postData)
      .then((res) => {
        this.updateProductCartAfterRemove(res.data);
        stores.cartInfoTotalProductsStore.getProductsCartInfoTotal();
        stores.cartCountProductsStore.getProductsCartCountItems();
        this.isProductRemoveCart = true;
      })
      .catch((error) => {
        console.log('Error====', error);
      });
  }

  @action
  updateProductCartAfterRemove = (data) => {
    stores.cartProductsStore.productsCart = data;
  };

  get cartItemKkey() {
    return this.cart_item_key;
  }

  clear() {
    this.cart_item_key = '';
    this.isProductRemoveCart = false;
  }
}
