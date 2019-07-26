import request from '../request'

export default class Products {
  async getProducts() {
    return await request('/wc/v3/products', {})
  }
}
