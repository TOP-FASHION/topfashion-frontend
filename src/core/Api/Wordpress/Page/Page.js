import request from '../../request'

export default async function Page (idPage, lang) {
  return await request(`/wp-json/wp/v2/pages/${idPage}?lang=${lang}`, {})
}
