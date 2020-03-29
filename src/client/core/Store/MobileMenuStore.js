import { observable, action, computed } from 'mobx'

export default class MobileMenuStore {
  constructor (rootStore) {
    this.isOpenMobileMenu = false
    this.isOpenMobileFilter = false
    this.rootStore = rootStore
  }

  @observable isOpenMobileMenu

  @observable isOpenMobileFilter

  @action openMobileMenu () {
    if (this.isOpenMobileMenu) {
      this.isOpenMobileMenu = false
    } else {
      this.isOpenMobileMenu = true
    }
    return Promise.resolve()
  }

  @action closeMobileMenu () {
    this.isOpenMobileMenu = false
  }

  @action openMobileFilter () {
    this.isOpenMobileFilter = true
    return Promise.resolve()
  }

  @action closeMobileFilter () {
    this.isOpenMobileFilter = false
  }

  @computed get openModalLogin () {
    return !this.rootStore.loginStore.loggedIn && this.isOpenMobileMenu
  }
}
