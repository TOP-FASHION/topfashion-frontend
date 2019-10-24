import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class ProductStore {
  product

  getProduct (id) {
    return Api.Woocommerce.Product(id).then(res => {
      if (res.data) {
        this.setProduct(res.data)
      }
    })
  }

  setProduct = data => {
    this.product = data
  }
}

decorate(ProductStore, {
  product: observable,
  setData: action
})
