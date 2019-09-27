import request from '../request'

export default async function validateAuthCookie (cookie) {
  return request('/api/auth/validate_auth_cookie/', {
    method: 'POST',
    data: cookie
  })
}

