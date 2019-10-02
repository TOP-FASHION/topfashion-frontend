import { decorate, observable, action, runInAction } from 'mobx'
import Api from '../Api'

export default class ProductsStore {
  products

  getProducts () {
    Api.Products().then(res => {
      if (res) {
        runInAction(() => {
          this.setData(res)
        })
      }
    })
  }

  setData = data => {
    this.products = data
  }
}

decorate (ProductsStore, {
  products: observable,
  setData: action
})
