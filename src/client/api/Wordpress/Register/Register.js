import request from '../../request';

export default async function Register(data) {
  return request('/api/user/register', {
    method: 'POST',
    data,
  });
}
