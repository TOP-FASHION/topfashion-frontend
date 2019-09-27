import request from '../request'

export default class Products {
  async getProducts () {
    return await request('/wp-json/wc/v3/products', {})
  }
}
