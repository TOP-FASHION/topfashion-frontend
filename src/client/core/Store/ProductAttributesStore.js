import { decorate, observable, action } from 'mobx';
import Api from '../Api';

export default class ProductAttributesStore {
  attributes;

  attributeTerms;

  getAttributes(data) {
    return Api.Woocommerce.ProductAttributes(data).then((res) => {
      if (res.data) {
        this.setAttributes(res.data);
      }
    });
  }

  getAttributeTerms(data) {
    return Api.Woocommerce.ProductAttributeTerms(data).then((res) => {
      if (res.data) {
        this.setAttributeTerms(res.data);
      }
    });
  }

  setAttributes = (data) => {
    this.attributes = data;
  };

  setAttributeTerms = (data) => {
    const arrAttribute = [];
    Object.keys(data).map((key) => {
      const obj = data[key];
      let value;
      Object.keys(obj).forEach(() => {
        value = obj.name;
      });
      arrAttribute.push(value);
    });
    this.attributeTerms = arrAttribute;
  };
}

decorate(ProductAttributesStore, {
  attributes: observable,
  attributeTerms: observable,
  setData: action,
});
