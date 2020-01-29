import request from '../../request'

export default async function Post (idPost, lang) {
  return request(`/wp-json/wp/v2/posts/${idPost}?lang=${lang}`, {})
}
