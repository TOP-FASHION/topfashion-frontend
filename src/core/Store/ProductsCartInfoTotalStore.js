import { decorate, observable, action, autorun, runInAction } from 'mobx'
import Api from '../Api'

export default class ProductsCartInfoTotal {
  productsCartInfoTotal

  constructor () {
    autorun(() => this.getProductsCartInfoTotal())
  }

  getProductsCartInfoTotal () {
    return Api.ProductsCartInfoTotal().then(res => {
      if (res.data) {
        runInAction(() => {
          this.setProductsCartInfoTotal(res.data)
        })
      }
    })
  }

  setProductsCartInfoTotal = data => {
    this.productsCartInfoTotal = data
  }
}

decorate(ProductsCartInfoTotal, {
  productsCartInfoTotal: observable,
  setData: action
})
