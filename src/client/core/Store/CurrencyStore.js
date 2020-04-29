import { observable, action, autorun, runInAction } from 'mobx';
import Api from '../Api';

export default class CurrencyStores {
  @observable currency;

  constructor() {
    autorun(() => this.getCurrency());
  }

  getCurrency() {
    return Api.Woocommerce.Currency()
      .then((res) => {
        if (res && res.data) {
          runInAction(() => {
            this.setCurrency(res.data.code);
          });
        }
      })
      .catch((error) => {
        console.log('Error====', error);
      });
  }

  @action setCurrency = (data) => {
    this.currency = data;
  };
}
