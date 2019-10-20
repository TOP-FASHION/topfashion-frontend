import LoginStore from './LoginStore'
import ProductStore from './ProductStore'
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
import ProductCartUpdateItemStore from './ProductCartUpdateItemStore'
import ProductReviewsAddStore from "./ProductReviewsAddStore"

class RootStore {
  constructor () {
    this.loginStore = new LoginStore(this)
    this.productStore = new ProductStore(this)
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
    this.productCartUpdateItemStore = new ProductCartUpdateItemStore(this)
    this.productReviewsAddStore = new ProductReviewsAddStore(this)
  }
}

export default new RootStore()
