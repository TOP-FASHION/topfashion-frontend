import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class CartProductsStore {
  productsCart = 0

  isLoading = false

  getProductCart () {
    this.isLoading = true
    return Api.CoCart.CartProducts()
      .then(res => {
        this.setProductCart(res.data)
        this.isLoading = false
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }

  setProductCart = data => {
    this.productsCart = data
  }
}

decorate(CartProductsStore, {
  productsCart: observable,
  isLoading: observable,
  getProductCart: action
})
