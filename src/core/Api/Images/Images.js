export default class Images {
  getProductImage (productId, imageId) {
    return `api/images/products/${productId}/${imageId}/?ws_key=${process.env.PRESTASHOP_KEY}`
  }
}