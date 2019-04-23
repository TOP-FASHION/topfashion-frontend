import { observable, action } from 'mobx'
import Api from '../../Api/'

export default class ProductsStore {
  @observable products;

  constructor () {
    this.products = {}
  }

  @action getProducts () {
    Api.products.getProducts().then((res) => {
      if (res) {
        this.products = res
      }
    })
  }
}