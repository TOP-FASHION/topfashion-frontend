import { decorate, observable, action, autorun, runInAction } from 'mobx'
import Api from '../Api'

export default class CurrencyStores {
  currency

  constructor () {
    autorun(() => this.getCurrency())
  }

  getCurrency () {
    return Api.Currency().then(res => {
      if (res) {
        runInAction(() => {
          this.setCurrency(res.code)
        })
      }
    })
  }

  setCurrency = data => {
    this.currency = data
  }
}

decorate(CurrencyStores, {
  currency: observable,
  setData: action
})