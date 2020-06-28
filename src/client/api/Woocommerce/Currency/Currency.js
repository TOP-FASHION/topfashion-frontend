import request from '../../request';

export default async function Currency() {
  return request('/wp-json/wc/v3/data/currencies/current', {});
}
