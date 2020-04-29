import request from '../../request';

export default async function ProductAttributes(data) {
  return request(`/wp-json/wc/v3/products/attributes`, {
    data,
  });
}
