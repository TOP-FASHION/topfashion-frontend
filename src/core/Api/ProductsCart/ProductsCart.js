import request from '../request'

export default async function ProductsCart () {
  return await request('/wp-json/cocart/v1/get-cart', {})
}
