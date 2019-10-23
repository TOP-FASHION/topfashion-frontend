import request from '../request'

export default async function Products (pageNumber, count, sortASC) {
  sortASC = sortASC || 'desc'
  return await request(`/wp-json/wc/v3/products?page=${pageNumber}&per_page=${count}&filter[limit]=${count}&order=${sortASC}`, {})
}
