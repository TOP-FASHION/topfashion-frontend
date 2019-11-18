import { observable, action, computed } from 'mobx'

export default class ModalStore {

  constructor (rootStore) {
    this.isOpenModalLogin = false
    this.openModalProduct = false
    this.rootStore = rootStore
  }

  @observable isOpenModalLogin
  @observable openModalProduct
  @observable productIdModal

  @action openLogin () {
    this.isOpenModalLogin = true
  }

  @action closeLogin () {
    this.isOpenModalLogin = false
  }

  @computed get openModalLogin () {
    return !this.rootStore.loginStore.loggedIn && this.isOpenModalLogin
  }

  @action openProduct (productId) {
    this.productIdModal = productId
    this.openModalProduct = true
  }

  @action closeProduct () {
    this.openModalProduct = false
  }
}
