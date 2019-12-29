import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class WishlistGetProductsStore {
  productsWishlist

  constructor (rootStore) {
    this.rootStore = rootStore
  }

  getProducts () {
    if (this.rootStore.wishlistByUserStore.wishlistUser && this.rootStore.wishlistByUserStore.wishlistUser[0]) {
      // eslint-disable-next-line camelcase
      const share_key = this.rootStore.wishlistByUserStore.wishlistUser[0].share_key
      return Api.Wishlist.WishlistGetProducts(share_key)
        .then(res => {
          if (res) {
            this.productsWishlist = res.data
            return res.data
          }
          return null
        })
        .catch(error => {
          console.log('Error====', error)
        })
    }
  }
}

decorate(WishlistGetProductsStore, {
  productsWishlist: observable,
  getProducts: action
})
