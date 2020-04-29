import { decorate, observable, action } from 'mobx';
import Api from '../Api';
import { stores } from './context';

export default class WishlistRemoveProductStore {
  // eslint-disable-next-line camelcase
  product_id;

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

decorate(WishlistRemoveProductStore, {
  product_id: observable,
  removeProduct: action,
});
