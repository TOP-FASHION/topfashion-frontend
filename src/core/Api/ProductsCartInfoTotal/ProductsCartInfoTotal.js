import request from '../request'

export default async function ProductsCartInfoTotal () {
  return await request('/wp-json/cocart/v1/totals', {})
}
