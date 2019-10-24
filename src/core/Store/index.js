// Wordpress
import LoginStore from './LoginStore'

// Woocomerce
import ProductStore from './ProductStore'
import ProductsStore from './ProductsStore'
import CurrencyStore from './CurrencyStore'
import ProductReviewsStore from './ProductReviewsStore'
import ProductReviewsAddStore from "./ProductReviewsAddStore"

// CoCart
import CartAddProductStore from './CartAddProductStore'
import CartCountProductsStore from './CartCountProductsStore'
import CartInfoTotalProductsStore from './CartInfoTotalProductsStore'
import CartProductsStore from './CartProductsStore'
import CartRemoveProductStore from './CartRemoveProductStore'
import CartUpdateProductStore from './CartUpdateProductStore'

// Others
import ChangeLanguageStore from './ChangeLanguageStore'
import ModalStore from './ModalStore'

class RootStore {
  constructor () {
    // Wordpress
    this.loginStore = new LoginStore(this)

    // Woocomerce
    this.productStore = new ProductStore(this)
    this.productsStore = new ProductsStore(this)
    this.currencyStore = new CurrencyStore(this)
    this.productReviewsStore = new ProductReviewsStore(this)
    this.productReviewsAddStore = new ProductReviewsAddStore(this)

    // CoCart
    this.cartAddProductStore = new CartAddProductStore(this)
    this.cartCountProductsStore = new CartCountProductsStore(this)
    this.cartInfoTotalProductsStore = new CartInfoTotalProductsStore(this)
    this.cartProductsStore = new CartProductsStore(this)
    this.cartRemoveProductStore = new CartRemoveProductStore(this)
    this.cartUpdateProductStore = new CartUpdateProductStore(this)

    // Others
    this.changeLanguageStore = new ChangeLanguageStore(this)
    this.modalStore = new ModalStore(this)
  }
}

export default new RootStore()
