import request from '../../request'

export default async function CartCountProducts () {
  return await request('/wp-json/cocart/v1/count-items', {})
}
