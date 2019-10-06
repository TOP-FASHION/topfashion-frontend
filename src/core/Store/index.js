import LoginStore from './LoginStore'
import ProductsStore from './ProductsStore'
import ChangeLanguageStore from './ChangeLanguageStore'
import ModalStore from './ModalStore'
import CurrencyStore from './CurrencyStore'
import ProductsCartStore from './ProductsCartStore'
import ProductCartAddStore from './ProductCartAddStore'
import ProductReviewsStore from './ProductReviewsStore'
import ProductCartRemoveStore from './ProductCartRemoveStore'
import ProductsCartInfoTotalStore from './productsCartInfoTotalStore'
import ProductsCartCountItemsStore from './ProductsCartCountItemsStore'

class RootStore {
  constructor () {
    this.loginStore = new LoginStore(this)
    this.productsStore = new ProductsStore(this)
    this.changeLanguageStore = new ChangeLanguageStore(this)
    this.modalStore = new ModalStore(this)
    this.currencyStore = new CurrencyStore(this)
    this.productsCartStore = new ProductsCartStore(this)
    this.productCartAddStore = new ProductCartAddStore(this)
    this.productReviewsStore = new ProductReviewsStore(this)
    this.productCartRemoveStore = new ProductCartRemoveStore(this)
    this.productsCartInfoTotalStore = new ProductsCartInfoTotalStore(this)
    this.productsCartCountItemsStore = new ProductsCartCountItemsStore(this)
  }
}

export default new RootStore()
