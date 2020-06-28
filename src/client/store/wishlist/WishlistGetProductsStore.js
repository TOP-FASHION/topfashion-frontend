import { decorate, observable, action } from 'mobx';
import Api from '../../api';
import { stores } from '../context';

export default class WishlistGetProductsStore {
  productsWishlist;

  getProducts() {
    if (
      stores.wishlistByUserStore.wishlistUser &&
      stores.wishlistByUserStore.wishlistUser[0]
    ) {
      // eslint-disable-next-line camelcase
      const { share_key } = stores.wishlistByUserStore.wishlistUser[0];
      return Api.Wishlist.WishlistGetProducts(share_key)
        .then((res) => {
          if (res) {
            this.productsWishlist = res.data;
            return res.data;
          }
          return null;
        })
        .catch((error) => {
          console.log('Error====', error);
        });
    }
  }
}

decorate(WishlistGetProductsStore, {
  productsWishlist: observable,
  getProducts: action,
});
