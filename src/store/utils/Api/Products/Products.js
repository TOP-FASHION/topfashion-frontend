import request from '../request'

export default class Products {
  async getProducts () {
    return await request('api/products?display=full', {})
  }
  getOneProduct (id) {
    return request(`api/products/${id}/`)
  }
  selected (array) {
    return get.selected(array)
  }
  getProductCategoryName (id) {
    return getCategory.one(id)
  }
  getFilterProductsList (limit = null, category = null, manufacturer = null, products = null) {
    if (Array.isArray(products)) {
      var productsRequestString = products.join('|')
    }

    return request(`api/products/` +
      `?display=[id,id_default_image,price,wholesale_price,name,show_price,link_rewrite]` +
      `&filter[active]=[1]` +
      `${category !== null ? `&filter[id_category_default]=[${category}]` : ``}` +
      `${manufacturer !== null ? `&filter[id_manufacturer]=[${manufacturer}]` : ``}` +
      `${products !== null ? `&filter[id]=[${productsRequestString}]` : ``}` +
      `${limit !== null ? `&limit=${limit}` : ``}`)
  }

  getProductInfo (id) {
    return request(`api/products/` +
      `?display=[id_default_image,price,wholesale_price,name,show_price,link_rewrite]` +
      `&filter[active]=[1]&filter[id]=${id}`)
  }
}