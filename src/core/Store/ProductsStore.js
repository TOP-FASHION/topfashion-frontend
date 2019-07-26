import { observable, action } from 'mobx'
import Api from '../Api'

export default class ProductsStore {
  @observable products

  constructor() {
    this.products = null
    console.log('this.products', this.products)
  }

  @action getProducts() {
    Api.products.getProducts().then(res => {
      console.log('res', res)
      if (res) {
        this.products = res
      }
    })
  }
}
