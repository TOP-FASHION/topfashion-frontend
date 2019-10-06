import { decorate, observable, action, runInAction } from 'mobx'
import Api from '../Api'

export default class ProductsStore {
  products

  getProducts () {
    return Api.Products().then(res => {
      if (res) {
        this.setProducts(res)
      }
    })
  }

  setProducts = data => {
    this.products = data
  }
}

decorate(ProductsStore, {
  products: observable,
  setData: action
})
