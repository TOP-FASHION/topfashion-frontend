import request from '../request'

export default async function ProductRemoveCart (data) {
  return await request('/wp-json/cocart/v1/item?thumb=true', {
    method: 'DELETE',
    data: data
  })
}
