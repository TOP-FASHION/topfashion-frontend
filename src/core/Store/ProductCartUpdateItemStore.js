import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class ProductCartUpdateItemStore {
  isProductUpdateCart

  constructor (rootStore) {
    this.rootStore = rootStore
    this.isProductUpdateCart = false
  }

  updateProduct (data) {
    const postData = {}
    postData.cart_item_key = data.cart_item_key
    postData.quantity = data.quantity
    postData.return_cart = true
    postData.refresh_totals = true
    return Api.ProductCartUpdateItem(postData)
      .then(res => {
        this.setProductAfterUpdateCart(res)
        this.rootStore.productsCartInfoTotalStore.getProductsCartInfoTotal()
        this.rootStore.productsCartCountItemsStore.getProductsCartCountItems()
        this.isProductUpdateCart = true
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }

  setProductAfterUpdateCart = data => {
    this.rootStore.productsCartStore.productsCart = data
  }

  clear () {
    this.isProductUpdateCart = false
  }
}

decorate(ProductCartUpdateItemStore, {
  isProductUpdateCart: observable,
  updateProduct: action.bound,
  setProductAfterUpdateCart: action
})
