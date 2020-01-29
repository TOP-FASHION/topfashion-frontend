import request from '../../request'

export default async function ProductSearch (name) {
  return request(`/wp-json/wc/v3/products?search=${name}`, {})
}
