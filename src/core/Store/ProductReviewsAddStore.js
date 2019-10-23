import { observable, action, computed, autorun, when, runInAction } from 'mobx'
import Api from '../Api'

export default class ProductReviewsAddStore {
  @observable review
  @observable reviewer
  @observable reviewer_email
  @observable rating

  constructor (rootStore) {
    this.rootStore = rootStore
  }

  @action.bound onReviewerChange(event) {
    this.reviewer = event.target.value
  }

  @action.bound onReviewerEmailChange(event) {
    this.reviewer_email = event.target.value
  }

  @action.bound onReviewChange(event) {
    this.review = event.target.value
  }

  @action.bound onRatingChange(event) {
    this.rating = event.target.value
  }

  @action addReview (productId, count) {
    const postData = {}
    postData.product_id = productId
    postData.review = this.review
    postData.reviewer = this.reviewer
    postData.reviewer_email = this.reviewer_email
    postData.rating = this.rating
    return Api.ProductReviewsAdd(postData)
      .then(res => {
        Api.ProductReviews(productId, count).then((res) => {
          if (res.data) {
            this.setReviewAfterAdd(res.data)
          }
        })
        console.log('res', res.data)
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }

  setReviewAfterAdd = data => {
    this.rootStore.productReviewsStore.productReviews = data
  }
}
