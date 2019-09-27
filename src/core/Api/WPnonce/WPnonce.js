import request from '../request'

export default class WPnonce {
  async getWPnonce (methodString) {
    return request(`/api/get_nonce/?controller=user&method=${methodString}`, {})
  }
}
