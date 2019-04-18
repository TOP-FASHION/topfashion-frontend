import request from '../request';

export default async function Products(params) {
  return await request('api/products', params);
}