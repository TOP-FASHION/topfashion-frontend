import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class ProductsCartStore {
  productsCart

  isLoading = false

  getProductCart () {
    this.isLoading = true
    Api.ProductsCart()
      .then(res => {
        console.log('122', res)
        this.productsCart = true
        this.isLoading = false
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }
}

decorate(ProductsCartStore, {
  productsCart: observable,
  isLoading: observable,
  getProductCart: action
})
