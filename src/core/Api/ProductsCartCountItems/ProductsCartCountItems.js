import request from '../request'

export default async function ProductsCartCountItems () {
  return await request('/wp-json/cocart/v1/count-items', {})
}
