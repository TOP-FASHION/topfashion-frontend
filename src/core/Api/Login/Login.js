import request from '../request'

export default class Login {
  async signIn (data) {
    return request('/api/user/generate_auth_cookie', {
      method: 'POST',
      data: data
    })
  }
}
