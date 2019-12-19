import { decorate, action } from 'mobx'
import Api from '../Api'

export default class WishlistAddProductStore {
  constructor (rootStore) {
    this.rootStore = rootStore
  }

  addProduct (data) {
    // eslint-disable-next-line camelcase
    const share_key = this.rootStore.wishlistByUserStore.wishlistUser[0].share_key
    const postData = {}
    postData.product_id = data
    return Api.Wishlist.WishlistAddProduct(postData, share_key)
      .then(res => {
        this.rootStore.wishlistGetProductsStore.getProducts()
        return res.data
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }
}

decorate(WishlistAddProductStore, {
  addProduct: action
})
