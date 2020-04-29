import request from '../../request';

export default async function CartProductsByUser(userId) {
  return request(`/wp-json/cocart/v1/get-cart/${userId}`, {});
}
