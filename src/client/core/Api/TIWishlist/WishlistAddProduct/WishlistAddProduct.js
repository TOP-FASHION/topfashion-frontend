import request from '../../request';

// eslint-disable-next-line camelcase
export default async function WishlistAddProduct(data, share_key) {
  // eslint-disable-next-line camelcase
  return request(`/wp-json/wc/v3/wishlist/${share_key}/add_product`, {
    method: 'POST',
    data,
  });
}
