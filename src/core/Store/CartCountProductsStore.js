import { decorate, observable, action, autorun, runInAction } from 'mobx'
import Api from '../Api'

export default class CartCountProductsStore {
  productsCartCountItems

  constructor () {
    autorun(() => this.getProductsCartCountItems())
  }

  getProductsCartCountItems () {
    return Api.CoCart.CartCountProducts().then(res => {
      runInAction(() => {
        this.getProductsCartCountItemsAfterUpfate(res.data)
      })
    })
  }

  getProductsCartCountItemsAfterUpfate = data => {
    this.productsCartCountItems = data
  }
}

decorate(CartCountProductsStore, {
  productsCartCountItems: observable,
  setData: action
})
