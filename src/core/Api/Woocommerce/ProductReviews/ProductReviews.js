import request from '../../request'

export default async function ProductReviews (productId, pageNumber) {
  return request(`/wp-json/wc/v3/products/reviews?product=${productId}&page=${pageNumber}&per_page=3`, {})
}
