import { decorate, observable, action } from 'mobx';
import Api from '../../api';

export default class ProductsCategoriesStore {
  categories;

  categoryId;

  getCategories(data) {
    return Api.Woocommerce.ProductsCategories(data).then((res) => {
      if (res.data) {
        this.setProduct(res.data);
      }
    });
  }

  setProduct = (data) => {
    this.categories = data;
  };
}

decorate(ProductsCategoriesStore, {
  categories: observable,
  categoryId: observable,
  setData: action,
});
