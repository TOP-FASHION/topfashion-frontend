import { observable, action, computed } from 'mobx'
import { stores } from './context'

export default class MobileMenuStore {
  constructor () {
    this.isOpenMobileMenu = false
    this.isOpenMobileFilter = false
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
    return !stores.loginStore.loggedIn && this.isOpenMobileMenu
  }
}
