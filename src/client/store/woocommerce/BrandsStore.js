import { observable, action } from 'mobx';
import Api from '../../api';

export default class BrandsStore {
  @observable brands;

  @action
  getBrands() {
    return Api.Woocommerce.Brands().then((res) => {
      if (res.data) {
        // this.setBrands(res.data)
        this.brands = res.data;
      }
    });
  }

  setBrands = (data) => {
    const arrBrands = [];
    Object.keys(data).map((key) => {
      const obj = data[key];
      let value;
      Object.keys(obj).forEach(() => {
        value = obj.name;
      });
      return arrBrands.push(value);
    });
    this.brands = arrBrands;
  };
}
