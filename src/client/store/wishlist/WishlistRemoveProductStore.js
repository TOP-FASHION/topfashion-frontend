import { observable, action } from 'mobx';
import Api from '../../api';
import { stores } from '../context';

export default class WishlistRemoveProductStore {
  @observable product_id;

  @action
  removeProduct(data) {
    return Api.Wishlist.WishlistRemoveProduct(data)
      .then((res) => {
        stores.wishlistGetProductsStore.getProducts();
        return res.data;
      })
      .catch((error) => {
        console.log('Error====', error);
      });
  }
}
