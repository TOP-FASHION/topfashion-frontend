import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class ProductsCartStore {
  productsCart = 0
  isLoading = false

  getProductCart () {
    this.isLoading = true
    return Api.ProductsCart()
      .then(res => {
        this.setProductCart(res)
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

decorate(ProductsCartStore, {
  productsCart: observable,
  isLoading: observable,
  getProductCart: action
})
