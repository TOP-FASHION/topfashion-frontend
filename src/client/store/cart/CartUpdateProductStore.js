import { observable, action } from 'mobx';
import Api from '../../api';
import { stores } from '../context';

export default class CartUpdateProductStore {
  @observable isProductUpdateCart;

  constructor() {
    this.isProductUpdateCart = false;
  }

  @action.bound
  updateProduct(data) {
    const postData = {};
    postData.cart_item_key = data.cart_item_key;
    postData.quantity = data.quantity;
    postData.return_cart = true;
    postData.refresh_totals = true;
    return Api.CoCart.CartUpdateProduct(postData)
      .then((res) => {
        this.setProductAfterUpdateCart(res.data);
        stores.cartInfoTotalProductsStore.getProductsCartInfoTotal();
        stores.cartCountProductsStore.getProductsCartCountItems();
        this.isProductUpdateCart = true;
      })
      .catch((error) => {
        console.log('Error====', error);
      });
  }

  @action
  setProductAfterUpdateCart = (data) => {
    stores.cartProductsStore.productsCart = data;
  };

  clear() {
    this.isProductUpdateCart = false;
  }
}
