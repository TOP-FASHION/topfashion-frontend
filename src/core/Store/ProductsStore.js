import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class ProductsStore {
  products
  totalProducts
  pagesProducts
  countProducts = 9

  getProducts (data) {
    return Api.Woocommerce.Products(data)
      .then((res) => {
        if (res.data) {
          this.setProducts(res.data)
        }
        this.totalProducts = res.headers['x-wp-total']
        this.pagesProducts = res.headers['x-wp-totalpages']
      })
  }

  setProducts = data => {
    this.products = data
  }
}

decorate(ProductsStore, {
  products: observable,
  totalProducts: observable,
  pagesProducts: observable,
  countProducts: observable,
  setData: action
})
