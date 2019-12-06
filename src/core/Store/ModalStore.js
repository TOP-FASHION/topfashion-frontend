import { observable, action, computed } from 'mobx'

export default class ModalStore {
  constructor (rootStore) {
    this.isOpenModalLogin = false
    this.isOpenModalRegistration = false
    this.openModalProduct = false
    this.rootStore = rootStore
  }

  @observable isOpenModalLogin

  @observable isOpenModalRegistration

  @observable openModalProduct

  @observable productIdModal

  // LOGIN
  @action openLogin () {
    this.isOpenModalLogin = true
  }

  @action closeLogin () {
    this.isOpenModalLogin = false
  }

  @computed get openModalLogin () {
    return !this.rootStore.loginStore.loggedIn && this.isOpenModalLogin
  }

  // REGASTRATION
  @action openRegistration () {
    this.isOpenModalRegistration = true
  }

  @action closeRegistration () {
    this.isOpenModalRegistration = false
  }

  @computed get openModalRegistration () {
    return !this.rootStore.loginStore.loggedIn && this.isOpenModalRegistration
  }

  // PRODUCT
  @action openProduct (productId) {
    this.productIdModal = productId
    this.openModalProduct = true
  }

  @action closeProduct () {
    this.openModalProduct = false
  }
}
