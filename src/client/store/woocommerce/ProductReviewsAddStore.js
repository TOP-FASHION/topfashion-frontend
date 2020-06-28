import { observable, action } from 'mobx';
import Api from '../../api';
import { stores } from '../context';

export default class ProductReviewsAddStore {
  @observable review;

  @observable reviewer;

  // eslint-disable-next-line camelcase
  @observable reviewer_email;

  @observable rating;

  @action.bound onReviewerChange(event) {
    this.reviewer = event.target.value;
  }

  @action.bound onReviewerEmailChange(event) {
    this.reviewer_email = event.target.value;
  }

  @action.bound onReviewChange(event) {
    this.review = event.target.value;
  }

  @action.bound onRatingChange(event) {
    this.rating = event.target.value;
  }

  @action addReview(productId, count) {
    const postData = {};
    postData.product_id = productId;
    postData.review = this.review;
    postData.reviewer = this.reviewer;
    postData.reviewer_email = this.reviewer_email;
    postData.rating = this.rating;
    return Api.Woocommerce.ProductReviewsAdd(postData)
      .then((res) => {
        Api.Woocommerce.ProductReviews(productId, count).then((res) => {
          if (res.data) {
            this.setReviewAfterAdd(res.data);
          }
        });
      })
      .catch((error) => {
        console.log('Error====', error);
      });
  }

  setReviewAfterAdd = (data) => {
    stores.productReviewsStore.productReviews = data;
  };
}
