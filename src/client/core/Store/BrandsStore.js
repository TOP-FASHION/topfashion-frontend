import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class BrandsStore {
  brands

  getBrands () {
    return Api.Woocommerce.Brands().then(res => {
      if (res.data) {
        // this.setBrands(res.data)
        this.brands = res.data
      }
    })
  }

  setBrands = data => {
    const arrBrands = []
    Object.keys(data).map(key => {
      const obj = data[key]
      let value
      Object.keys(obj).forEach(() => {
        value = obj.name
      })
      arrBrands.push(value)
    })
    this.brands = arrBrands
  }
}

decorate(BrandsStore, {
  brands: observable,
  getBrands: action
})
