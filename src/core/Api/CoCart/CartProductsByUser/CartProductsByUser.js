import request from '../../request'

export default async function CartProductsByUser (userId) {
  return await request(`/wp-json/cocart/v1/get-cart/${userId}`, {})
}
