import request from '../../request'

export default async function CartInfoTotalProducts () {
  return await request('/wp-json/cocart/v1/totals', {})
}
