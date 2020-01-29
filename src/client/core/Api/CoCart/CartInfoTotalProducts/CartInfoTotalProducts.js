import request from '../../request'

export default async function CartInfoTotalProducts () {
  return request('/wp-json/cocart/v1/totals', {})
}
