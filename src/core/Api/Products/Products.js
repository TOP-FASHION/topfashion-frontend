import request from '../request'

export default async function Products () {
  return await request('/wp-json/wc/v3/products', {})
}
