import request from '../request'

export default async function ProductReviews (productId) {
  return await request(`/wp-json/wc/v2/products/${productId}/reviews`, {})
}
