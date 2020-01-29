import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class WishlistRemoveProductStore {
  // eslint-disable-next-line camelcase
  product_id

  constructor (rootStore) {
    this.rootStore = rootStore
  }

  removeProduct (data) {
    return Api.Wishlist.WishlistRemoveProduct(data)
      .then(res => {
        this.rootStore.wishlistGetProductsStore.getProducts()
        return res.data
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }
}

decorate(WishlistRemoveProductStore, {
  product_id: observable,
  removeProduct: action
})
