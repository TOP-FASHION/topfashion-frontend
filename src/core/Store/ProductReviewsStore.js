import { decorate, observable, action, runInAction, autorun } from 'mobx'
import Api from '../Api'

export default class ProductReviewsStore {
  productReviews

  getProductReviews (id, page) {
    Api.ProductReviews(id, page).then(res => {
      if (res.data) {
        console.log('res', res.data)
        runInAction(() => {
          this.setData(res.data)
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
