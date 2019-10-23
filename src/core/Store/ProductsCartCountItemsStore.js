import { decorate, observable, action, autorun, runInAction } from 'mobx'
import Api from '../Api'

export default class ProductsCartCountItemsStore {
  productsCartCountItems

  constructor () {
    autorun(() => this.getProductsCartCountItems())
  }

  getProductsCartCountItems () {
    return Api.ProductsCartCountItems().then(res => {
      runInAction(() => {
        this.getProductsCartCountItemsAfterUpfate(res.data)
      })
    })
  }

  getProductsCartCountItemsAfterUpfate = data => {
    this.productsCartCountItems = data
  }
}

decorate(ProductsCartCountItemsStore, {
  productsCartCountItems: observable,
  setData: action
})
