import request from '../request'

export default async function Products (data) {
  return await request(`/wp-json/wc/v3/products`, {
    data: data
  })
}
