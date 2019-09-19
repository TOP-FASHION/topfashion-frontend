import ProductsStore from './ProductsStore'
import ChangeLanguageStore from './ChangeLanguageStore'

const allStore = {
  productsStore: new ProductsStore(),
  changeLanguageStore: new ChangeLanguageStore()
}

export default allStore
