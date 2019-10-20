import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class ProductStore {
  product

  getProduct (id) {
    return Api.Product(id).then(res => {
      if (res) {
        this.setProduct(res)
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
