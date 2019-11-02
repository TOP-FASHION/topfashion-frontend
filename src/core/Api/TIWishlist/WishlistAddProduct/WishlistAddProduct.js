import request from '../../request'

export default async function CartAddProduct (data) {
  return await request('/wp-json/cocart/v1/add-item?thumb=true', {
    method: 'POST',
    data: data
  })
}
