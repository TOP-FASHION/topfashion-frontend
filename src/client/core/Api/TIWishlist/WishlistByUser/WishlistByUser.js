import request from '../../request'

export default async function WishlistByUser (id) {
  // eslint-disable-next-line camelcase
  return request(`/wp-json/wc/v3/wishlist/get_by_user/${id}`, {})
}
