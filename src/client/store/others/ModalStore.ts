import { observable, action, computed } from 'mobx';
import { stores } from '../context';

class ModalStore {
  // constructor() {
  //   // this.isOpenModalLogin = false
  //   this.isOpenModalRegistration = false;
  //   this.openModalProduct = false;
  // }

  @observable isOpenModalLogin = false;

  @observable isOpenModalRegistration;

  @observable openModalProduct;

  @observable productIdModal;

  // LOGIN
  @action
  openLogin() {
    this.isOpenModalLogin = true;
    return Promise.resolve();
  }

  @action
  closeLogin() {
    this.isOpenModalLogin = false;
  }

  @computed
  get openModalLogin() {
    return !stores.loginStore.loggedIn && this.isOpenModalLogin;
  }

  // REGASTRATION
  @action
  openRegistration() {
    this.isOpenModalRegistration = true;
  }

  @action
  closeRegistration() {
    this.isOpenModalRegistration = false;
  }

  @computed
  get openModalRegistration() {
    return !stores.loginStore.loggedIn && this.isOpenModalRegistration;
  }

  // PRODUCT
  @action
  openProduct(productId) {
    this.productIdModal = productId;
    this.openModalProduct = true;
  }

  @action
  closeProduct() {
    this.openModalProduct = false;
  }
}

export default ModalStore;
