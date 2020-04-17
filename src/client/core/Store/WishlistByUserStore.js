import { decorate, observable, action } from 'mobx'
import Api from '../Api'
import { stores } from './context'

export default class WishlistByUserStore {
  wishlistUser

  getWishlistByUser (id) {
    Api.Wishlist.WishlistByUser(id)
      .then(res => {
        this.wishlistUser = res.data
        stores.wishlistGetProductsStore.getProducts()
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
