import { action } from 'mobx';
import Api from '../../api';
import { stores } from '../context';

export default class WishlistAddProductStore {
  @action
  addProduct(data) {
    // eslint-disable-next-line camelcase
    const { share_key } = stores.wishlistByUserStore.wishlistUser[0];
    const postData = {};
    postData.product_id = data;
    return Api.Wishlist.WishlistAddProduct(postData, share_key)
      .then((res) => {
        stores.wishlistGetProductsStore.getProducts();
        return res.data;
      })
      .catch((error) => {
        console.log('Error====', error);
      });
  }
}
