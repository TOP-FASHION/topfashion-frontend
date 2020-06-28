import decode from './decode';

const SEARCH = /([^&=]+)=?([^&]*)/g;

/**
 * @param {String} search
 * @param {String} prefix
 * @return {Object}
 * */
export default function searchParse(search: any, prefix = '?') {
  if (search.startsWith(prefix)) {
    search = search.slice(prefix.length);
  }
  const result: any = {};
  let match: any;
  while ((match = SEARCH.exec(search))) {
    result[decode(match[1])] = decode(match[2]);
  }
  return result;
}
