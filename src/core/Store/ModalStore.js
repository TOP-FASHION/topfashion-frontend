import { observable, action } from 'mobx'

export default class ModalStore {
  @observable openModalLogin

  constructor () {
    this.openModalLogin = false
  }

  @action openLogin() {
    this.openModalLogin = true
  }

  @action closeLogin() {
    this.openModalLogin = false
  }
}
