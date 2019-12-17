import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class CartAddProductStore {
  isProductAddCart

  // eslint-disable-next-line camelcase
  product_id

  constructor (rootStore) {
    this.rootStore = rootStore
    this.isProductAddCart = false
  }

  addProduct (data, quantity) {
    const postData = {}
    postData.product_id = data
    this.product_id = postData.product_id
    postData.quantity = quantity || 1
    postData.return_cart = true
    return Api.CoCart.CartAddProduct(postData)
      .then(res => {
        this.setProductAfterAddCart(res.data)
        this.rootStore.cartInfoTotalProductsStore.getProductsCartInfoTotal()
        this.rootStore.cartCountProductsStore.getProductsCartCountItems()
        this.isProductAddCart = true
        return res.data
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }

  setProductAfterAddCart = data => {
    this.rootStore.cartProductsStore.productsCart = data
  }

  get productId () {
    return this.product_id
  }

  clear () {
    this.product_id = ''
    this.isProductAddCart = false
  }
}

decorate(CartAddProductStore, {
  product_id: observable,
  isProductAddCart: observable,
  addProduct: action.bound,
  setProductAfterAddCart: action
})
