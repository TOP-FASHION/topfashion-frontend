import request from '../../request'

export default async function ProductsCategories (data) {
  return request(`/wp-json/wc/v3/products/categories`, {
    data: data
  })
}
