import { decorate, observable, action, runInAction } from 'mobx';
import Api from '../../api';

export default class ProductReviewsStore {
  productReviews;

  getProductReviews(id, page) {
    Api.Woocommerce.ProductReviews(id, page).then((res) => {
      if (res.data) {
        runInAction(() => {
          this.setData(res.data);
        });
      }
    });
  }

  setData = (data) => {
    this.productReviews = data;
  };
}

decorate(ProductReviewsStore, {
  productReviews: observable,
  setData: action,
});
