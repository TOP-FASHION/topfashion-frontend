import request from '../request'

export default async function WPnonce (methodString) {
  return request(`/api/get_nonce/?controller=user&method=${methodString}`, {})
}
