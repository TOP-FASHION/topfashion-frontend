import request from '../../request'

export default async function CartUpdateProduct (data) {
  return request('/wp-json/cocart/v1/item?thumb=true', {
    method: 'POST',
    data: data
  })
}
