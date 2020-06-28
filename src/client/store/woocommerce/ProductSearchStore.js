import { observable, action } from 'mobx';
import Api from '../../api';

export default class ProductSearchStore {
  @observable productBySearch;

  @observable form = {
    fields: {
      search: {
        value: '',
        error: null,
        rule: 'required|email',
      },
    },
  };

  @action onFieldChange = (field, value) => {
    this.form.fields[field.target.name].value = field.target.value;
  };

  @action getProductBySearch() {
    return Api.Woocommerce.ProductSearch(this.form.fields.search.value).then(
      (res) => {
        if (res.data) {
          this.setProduct(res.data);
        }
      }
    );
  }

  setProduct = (data) => {
    this.productBySearch = data;
  };
}
