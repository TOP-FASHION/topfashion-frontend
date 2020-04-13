import * as React from 'react'
import ProductsStore from './ProductsStore'
import PostStore from './PostStore'
import ChangeLanguageStore from './ChangeLanguageStore'
import LoginStore from './LoginStore'
import PageStore from './PageStore'
import ProductStore from './ProductStore'
import CurrencyStore from './CurrencyStore'
import ProductReviewsStore from './ProductReviewsStore'
import ProductReviewsAddStore from './ProductReviewsAddStore'
import ProductsCategoriesStore from './ProductsCategoriesStore'
import ProductAttributesStore from './ProductAttributesStore'
import BrandsStore from './BrandsStore'
import UserInfoStore from './UserInfoStore'
import ProductSearchStore from './ProductSearchStore'
import CartAddProductStore from './CartAddProductStore'
import CartCountProductsStore from './CartCountProductsStore'
import CartInfoTotalProductsStore from './CartInfoTotalProductsStore'
import CartProductsStore from './CartProductsStore'
import CartRemoveProductStore from './CartRemoveProductStore'
import CartUpdateProductStore from './CartUpdateProductStore'
import WishlistAddProductStore from './WishlistAddProductStore'
import WishlistByUserStore from './WishlistByUserStore'
import WishlistGetProductsStore from './WishlistGetProductsStore'
import WishlistRemoveProductStore from './WishlistRemoveProductStore'
import ModalStore from './ModalStore'
import MenuStore from './MenuStore'
import MobileMenuStore from './MobileMenuStore'

export function createStores () {
  return {
    // Wordpress
    loginStore: new LoginStore(),
    pageStore: new PageStore(),
    postStore: new PostStore(),

    // Woocomerce
    productStore: new ProductStore(),
    productsStore: new ProductsStore(),
    currencyStore: new CurrencyStore(),
    productReviewsStore: new ProductReviewsStore(),
    productReviewsAddStore: new ProductReviewsAddStore(),
    productsCategoriesStore: new ProductsCategoriesStore(),
    productAttributesStore: new ProductAttributesStore(),
    brandsStore: new BrandsStore(),
    userInfoStore: new UserInfoStore(),
    productSearchStore: new ProductSearchStore(),

    // CoCart
    cartAddProductStore: new CartAddProductStore(),
    cartCountProductsStore: new CartCountProductsStore(),
    cartInfoTotalProductsStore: new CartInfoTotalProductsStore(),
    cartProductsStore: new CartProductsStore(),
    cartRemoveProductStore: new CartRemoveProductStore(),
    cartUpdateProductStore: new CartUpdateProductStore(),

    // Wishlist
    wishlistAddProductStore: new WishlistAddProductStore(),
    wishlistByUserStore: new WishlistByUserStore(),
    wishlistGetProductsStore: new WishlistGetProductsStore(),
    wishlistRemoveProductStore: new WishlistRemoveProductStore(),

    // Others
    changeLanguageStore: new ChangeLanguageStore(),
    modalStore: new ModalStore(),
    menuStore: new MenuStore(),
    mobileMenuStore: new MobileMenuStore()
  }
}

export const stores = createStores()

export const AppContext = React.createContext(stores)

// export const StoreContext = createContext<TodoList>({} as TodoList);
// export const StoreProvider = StoreContext.Provider;
