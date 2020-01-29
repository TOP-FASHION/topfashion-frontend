import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class WishlistByUserStore {
  wishlistUser

  constructor (rootStore) {
    this.rootStore = rootStore
  }

  getWishlistByUser (id) {
    Api.Wishlist.WishlistByUser(id)
      .then(res => {
        this.wishlistUser = res.data
        this.rootStore.wishlistGetProductsStore.getProducts()
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }
}

decorate(WishlistByUserStore, {
  wishlistUser: observable,
  getWishlistByUser: action
})
