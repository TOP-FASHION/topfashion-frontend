import { observable, action, computed } from 'mobx'

export default class MobileMenuStore {
  constructor (rootStore) {
    this.isOpenMobileMenu = false
    this.rootStore = rootStore
  }

  @observable isOpenMobileMenu

  @action openMobileMenu () {
    this.isOpenMobileMenu = true
    return Promise.resolve()
  }

  @action closeMobileMenu () {
    this.isOpenMobileMenu = false
  }

  @computed get openModalLogin () {
    return !this.rootStore.loginStore.loggedIn && this.isOpenMobileMenu
  }
}
