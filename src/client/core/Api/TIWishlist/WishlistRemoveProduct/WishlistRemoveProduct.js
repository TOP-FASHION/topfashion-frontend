import request from '../../request';

// eslint-disable-next-line camelcase
export default async function WishlistRemoveProduct(item_id) {
  // eslint-disable-next-line camelcase
  return request(`/wp-json/wc/v3/wishlist/remove_product/${item_id}`, {});
}
