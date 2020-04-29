import request from '../../request';

export default async function Customer(id) {
  return request(`/wp-json/wc/v3/customers/${id}`, {});
}
