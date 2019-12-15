// Wordpress
import LoginStore from './LoginStore'
import PageStore from './PageStore'
import PostStore from './PostStore'

// Woocomerce
import ProductStore from './ProductStore'
import ProductsStore from './ProductsStore'
import CurrencyStore from './CurrencyStore'
import ProductReviewsStore from './ProductReviewsStore'
import ProductReviewsAddStore from './ProductReviewsAddStore'
import ProductsCategoriesStore from './ProductsCategoriesStore'
import ProductAttributesStore from './ProductAttributesStore'
import BrandsStore from './BrandsStore'

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
import MenuStore from './MenuStore'

class RootStore {
  constructor () {
    // Wordpress
    this.loginStore = new LoginStore(this)
    this.pageStore = new PageStore(this)
    this.postStore = new PostStore(this)

    // Woocomerce
    this.productStore = new ProductStore(this)
    this.productsStore = new ProductsStore(this)
    this.currencyStore = new CurrencyStore(this)
    this.productReviewsStore = new ProductReviewsStore(this)
    this.productReviewsAddStore = new ProductReviewsAddStore(this)
    this.productsCategoriesStore = new ProductsCategoriesStore(this)
    this.productAttributesStore = new ProductAttributesStore(this)
    this.brandsStore = new BrandsStore(this)

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
    this.menuStore = new MenuStore(this)
  }
}

export default new RootStore()
