import { observable, action, autorun, runInAction } from 'mobx'
import Api from '../Api'

export default class CurrencyStores {
  @observable currency

  constructor () {
    autorun(() => this.getCurrency())
  }

  getCurrency () {
    return Api.Woocommerce.Currency().then(res => {
      if (res.data) {
        runInAction(() => {
          this.setCurrency(res.data.code)
        })
      }
    })
  }

  @action setCurrency = data => {
    this.currency = data
  }
}
