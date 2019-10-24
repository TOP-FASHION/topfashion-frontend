import request from '../../request'

export default async function CartUpdateProduct (data) {
  return await request('/wp-json/cocart/v1/item?thumb=true', {
    method: 'POST',
    data: data
  })
}
