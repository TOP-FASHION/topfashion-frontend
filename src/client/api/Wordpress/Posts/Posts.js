import request from '../../request';

export default async function Posts() {
  return request(`/wp-json/wp/v2/posts`, {});
}
