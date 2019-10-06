import { decorate, observable, action, runInAction, autorun } from 'mobx'
import Api from '../Api'

export default class ProductReviewsStore {
  productReviews

  getProductReviews (id) {
    Api.ProductReviews(id).then(res => {
      if (res) {
        console.log('res', res)
        runInAction(() => {
          this.setData(res)
        })
      }
    })
  }

  setData = data => {
    this.productReviews = data
  }
}

decorate(ProductReviewsStore, {
  productReviews: observable,
  setData: action
})
