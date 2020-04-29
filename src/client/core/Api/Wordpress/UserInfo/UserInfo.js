import request from '../../request';

export default async function UserInfo(data) {
  return request('/api/user/get_currentuserinfo/', {
    method: 'POST',
    data,
  });
}
