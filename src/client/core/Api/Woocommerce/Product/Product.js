import request from '../../request'

export default async function Product (id) {
  return request(`/wp-json/wc/v3/products/${id}`, {})
}
