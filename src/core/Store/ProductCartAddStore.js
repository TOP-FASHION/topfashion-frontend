import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class ProductCartAddStore {
  isProductAddCart
  isLoading = false

  addProduct (data) {
    let postData = {}
    postData.product_id = data
    postData.quantity = 1
    this.isLoading = true
    Api.ProductAddCart(postData)
      .then(res => {
        this.isProductAddCart = true
        this.isLoading = false
      })
      .catch(error => {
        console.log("Error====", error)
      });
  }

}

decorate (ProductCartAddStore, {
  isProductAddCart: observable,
  isLoading: observable,
  addProduct: action
})
