import { observable, action } from 'mobx';

export default class ChangeLanguageStore {
  @observable language;

  constructor() {
    this.language = 'en';
  }

  @action changeLanguage(values) {
    this.language = values;
  }
}
