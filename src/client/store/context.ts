import * as React from 'react';

// Wordpress
import LoginStore from './wordpress/LoginStore';
import PageStore from './wordpress/PageStore';
import PostStore from './wordpress/PostStore';
import UserInfoStore from './wordpress/UserInfoStore';
import MenuStore from './wordpress/MenuStore';

// Woocomerce
import ProductStore from './woocommerce/ProductStore';
import ProductsStore from './woocommerce/ProductsStore';
import CurrencyStore from './woocommerce/CurrencyStore';
import ProductReviewsStore from './woocommerce/ProductReviewsStore';
import ProductReviewsAddStore from './woocommerce/ProductReviewsAddStore';
import ProductsCategoriesStore from './woocommerce/ProductsCategoriesStore';
import ProductAttributesStore from './woocommerce/ProductAttributesStore';
import BrandsStore from './woocommerce/BrandsStore';
import ProductSearchStore from './woocommerce/ProductSearchStore';

// CoCart
import CartAddProductStore from './cart/CartAddProductStore';
import CartCountProductsStore from './cart/CartCountProductsStore';
import CartInfoTotalProductsStore from './cart/CartInfoTotalProductsStore';
import CartProductsStore from './cart/CartProductsStore';
import CartRemoveProductStore from './cart/CartRemoveProductStore';
import CartUpdateProductStore from './cart/CartUpdateProductStore';

// Wishlist
import WishlistAddProductStore from './wishlist/WishlistAddProductStore';
import WishlistByUserStore from './wishlist/WishlistByUserStore';
import WishlistGetProductsStore from './wishlist/WishlistGetProductsStore';
import WishlistRemoveProductStore from './wishlist/WishlistRemoveProductStore';

// Others
import ChangeLanguageStore from './others/ChangeLanguageStore';
import ModalStore from './others/ModalStore';
import MobileMenuStore from './others/MobileMenuStore';

export function createStores() {
  return {
    // Wordpress
    loginStore: new LoginStore(),
    pageStore: new PageStore(),
    postStore: new PostStore(),
    userInfoStore: new UserInfoStore(),
    menuStore: new MenuStore(),

    // Woocomerce
    productStore: new ProductStore(),
    productsStore: new ProductsStore(),
    currencyStore: new CurrencyStore(),
    productReviewsStore: new ProductReviewsStore(),
    productReviewsAddStore: new ProductReviewsAddStore(),
    productsCategoriesStore: new ProductsCategoriesStore(),
    productAttributesStore: new ProductAttributesStore(),
    brandsStore: new BrandsStore(),
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
    mobileMenuStore: new MobileMenuStore(),
  };
}

const stores = createStores();

const AppContext = React.createContext(stores);

export { stores, AppContext };
