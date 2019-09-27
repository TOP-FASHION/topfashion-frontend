import LoginStore from './LoginStore'
import ProductsStore from './ProductsStore'
import ChangeLanguageStore from './ChangeLanguageStore'
import ModalStore from "./ModalStore"

class RootStore {
  constructor() {
    this.loginStore = new LoginStore(this)
    this.productsStore = new ProductsStore(this)
    this.changeLanguageStore= new ChangeLanguageStore(this)
    this.modalStore = new ModalStore(this)
  }
}

export default new RootStore();
