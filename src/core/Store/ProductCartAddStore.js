import { decorate, observable, action } from 'mobx'
import Api from '../Api'
import { toast } from 'react-toastify'

export default class ProductCartAddStore {
  isProductAddCart
  product_id

  constructor (rootStore) {
    this.rootStore = rootStore
  }

  addProduct (data) {
    const postData = {}
    postData.product_id = data
    this.product_id = postData.product_id
    postData.quantity = 1
    postData.return_cart = true
    return Api.ProductAddCart(postData)
      .then(res => {
        toast.success(`Product "${postData.product_id}" added to cart!`)
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
}

decorate(ProductCartAddStore, {
  product_id: observable,
  isProductAddCart: observable,
  addProduct: action,
  setProductAfterAddCart: action
})
