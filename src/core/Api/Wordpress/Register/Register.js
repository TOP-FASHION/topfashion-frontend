import request from '../../request'

export default class Register {
  async signUp (data) {
    return await request('/api/user/register', {
      method: 'POST',
      data: data
    })
  }
}
