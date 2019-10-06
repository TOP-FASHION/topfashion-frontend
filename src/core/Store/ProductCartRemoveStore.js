import React from 'react'
import { decorate, observable, action, computed, configure } from 'mobx'
import Api from '../Api'

export default class ProductCartRemoveStore {
  constructor (rootStore) {
    this.rootStore = rootStore
  }

  isProductRemoveCart = false

  isLoading = false

  removeProductCart (data) {
    const postData = {}
    postData.cart_item_key = data
    postData.return_cart = true
    this.isLoading = true
    return Api.ProductRemoveCart(postData)
      .then(res => {
        this.updateProductCartAfterRemove(res)
        this.rootStore.productsCartInfoTotalStore.getProductsCartInfoTotal()
        this.rootStore.productsCartCountItemsStore.getProductsCartCountItems()
        this.isProductRemoveCart = true
        this.isLoading = false
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }

  updateProductCartAfterRemove = data => {
    this.rootStore.productsCartStore.productsCart = data
  }
}

decorate(ProductCartRemoveStore, {
  isProductRemoveCart: observable,
  isLoading: observable,
  removeProductCart: action.bound,
  updateProductCartAfterRemove: action
})
