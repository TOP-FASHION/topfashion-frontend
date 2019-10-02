import request from '../request'

export default async function ProductAddCart (data) {
  return await request('/wp-json/cocart/v1/add-item',  {
    method: 'POST',
    data: data
  })
}
