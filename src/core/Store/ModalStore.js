import { observable, action } from 'mobx'

export default class ModalStore {
  @observable openModalLogin

  @observable openModalProduct

  @observable productIdModal

  constructor () {
    this.openModalLogin = false
    this.openModalProduct = false
  }

  @action openLogin () {
    this.openModalLogin = true
  }

  @action closeLogin () {
    this.openModalLogin = false
  }

  @action openProduct (productId) {
    this.productIdModal = productId
    this.openModalProduct = true
  }

  @action closeProduct () {
    this.openModalProduct = false
  }
}
