import request from '../../request'

export default async function Menu () {
  return request(`/wp-json/menus/v1/menus/main`, {})
}
