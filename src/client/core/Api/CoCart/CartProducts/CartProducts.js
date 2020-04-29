import request from '../../request';

export default async function CartProducts() {
  return request('/wp-json/cocart/v1/get-cart?thumb=true', {});
}
