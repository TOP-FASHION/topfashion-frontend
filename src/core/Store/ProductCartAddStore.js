import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class ProductCartAddStore {
  isProductAddCart
  product_id

  constructor (rootStore) {
    this.rootStore = rootStore
    this.isProductAddCart = false
  }

  addProduct (data) {
    const postData = {}
    postData.product_id = data
    this.product_id = postData.product_id
    postData.quantity = 1
    postData.return_cart = true
    return Api.ProductAddCart(postData)
      .then(res => {
        this.setProductAfterAddCart(res)
        this.rootStore.productsCartInfoTotalStore.getProductsCartInfoTotal()
        this.rootStore.productsCartCountItemsStore.getProductsCartCountItems()
        this.isProductAddCart = true
        return res
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }

  setProductAfterAddCart = data => {
    this.rootStore.productsCartStore.productsCart = data
  }

  get productId () {
    return this.product_id
  }

  clear () {
    this.product_id = ''
    this.isProductAddCart = false
  }
}

decorate(ProductCartAddStore, {
  product_id: observable,
  isProductAddCart: observable,
  addProduct: action.bound,
  setProductAfterAddCart: action
})
