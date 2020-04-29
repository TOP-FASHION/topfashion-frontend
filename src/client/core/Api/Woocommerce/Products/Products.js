import request from '../../request';

export default async function Products(data) {
  return request(`/wp-json/wc/v3/products`, {
    data,
  });
}
