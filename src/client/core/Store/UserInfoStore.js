import { observable, action } from 'mobx';
import Cookies from 'js-cookie';
import Api from '../Api';
import { stores } from './context';

export default class UserInfoStore {
  @observable user;

  @observable customer;

  @action getUserInfo() {
    const postData = {};
    postData.cookie = Cookies.get('auth');

    return Api.Wordpress.UserInfo(postData)
      .then((res) => {
        if (res.data.status === 'ok') {
          this.user = res.data.user;
          stores.wishlistByUserStore.getWishlistByUser(this.user.id);
          stores.wishlistGetProductsStore.getProducts();
        }
      })
      .catch((error) => {
        console.log('Error====', error);
      });
  }

  @action getCustomerInfo() {
    const userId = this.user.id;

    return Api.Woocommerce.Customer(userId)
      .then((res) => {
        this.customer = res.data;
      })
      .catch((error) => {
        console.log('Error====', error);
      });
  }
}
