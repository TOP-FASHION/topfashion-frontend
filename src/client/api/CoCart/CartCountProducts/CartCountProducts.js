import request from '../../request';

export default async function CartCountProducts() {
  return request('/wp-json/cocart/v1/count-items', {});
}
