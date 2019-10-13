import { decorate, observable, action} from 'mobx'
import Api from '../Api'

export default class ProductCartRemoveStore {
  isProductRemoveCart
  cart_item_key

  constructor (rootStore) {
    this.rootStore = rootStore
    this.isProductRemoveCart = false
  }

  removeProductCart (data) {
    const postData = {}
    postData.cart_item_key = data
    this.cart_item_key = postData.cart_item_key
    postData.return_cart = true
    return Api.ProductRemoveCart(postData)
      .then(res => {
        this.updateProductCartAfterRemove(res)
        this.rootStore.productsCartInfoTotalStore.getProductsCartInfoTotal()
        this.rootStore.productsCartCountItemsStore.getProductsCartCountItems()
        this.isProductRemoveCart = true
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }

  updateProductCartAfterRemove = data => {
    this.rootStore.productsCartStore.productsCart = data
  }

  get cartItemKkey () {
    return this.cart_item_key
  }

  clear () {
    this.cart_item_key = ''
    this.isProductRemoveCart = false
  }
}

decorate(ProductCartRemoveStore, {
  isProductRemoveCart: observable,
  cart_item_key: observable,
  removeProductCart: action.bound,
  updateProductCartAfterRemove: action
})
