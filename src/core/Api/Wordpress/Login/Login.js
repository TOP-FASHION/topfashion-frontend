import request from '../../request'

export default async function Login (data) {
  return await request('/api/user/generate_auth_cookie/', {
    method: 'POST',
    data: data
  })
}
