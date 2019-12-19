import { observable, action } from 'mobx'
import Api from '../Api'
import Cookies from 'js-cookie'

export default class UserInfoStore {
  @observable user

  constructor (rootStore) {
    this.rootStore = rootStore
  }

  @action getUserInfo () {
    const postData = {}
    postData.cookie = Cookies.get('auth')

    return Api.Wordpress.UserInfo(postData)
      .then(res => {
        if (res.data.status === 'ok') {
          this.user = res.data.user
          this.rootStore.wishlistByUserStore.getWishlistByUser(this.user.id)
          this.rootStore.wishlistGetProductsStore.getProducts()
        }
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }
}
