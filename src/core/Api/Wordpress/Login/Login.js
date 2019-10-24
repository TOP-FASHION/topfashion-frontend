import request from '../../request'

export default async function Login (data) {
  return request('/api/user/generate_auth_cookie', {
    method: 'POST',
    data: data
  })
}
