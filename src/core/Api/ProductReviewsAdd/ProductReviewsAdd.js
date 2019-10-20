import request from '../request'

export default async function ProductReviewsAdd (data) {
  return request('/wp-json/wc/v3/products/reviews', {
    method: 'POST',
    data: data
  })
}
