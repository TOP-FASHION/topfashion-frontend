import request from '../../request';

export default async function CartRemoveProduct(data) {
  return request('/wp-json/cocart/v1/item?thumb=true', {
    method: 'DELETE',
    data,
  });
}
