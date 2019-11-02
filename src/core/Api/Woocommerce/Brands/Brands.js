import request from '../../request'

export default async function Brands () {
  return await request(`/wp-json/wc/v3/brands`, {})
}
