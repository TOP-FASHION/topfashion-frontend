import request from '../../request'

export default async function Brands () {
  return request(`/wp-json/wc/v3/brands`, {})
}
