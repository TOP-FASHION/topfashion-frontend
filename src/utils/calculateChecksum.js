import crypto from 'crypto'

/**
 * Calculates checksum for a string.
 * @param {string} string='' - String to make a checksum for.
 * @param {string} algorithm='sha1' - Algorithm of the checksum.
 * @param {string} encoding='hex' - Encoding of the checksum.
 * @return {PromiseLike<ArrayBuffer>}
 */
export default (string = '', algorithm = 'sha1', encoding = 'hex') => {
  return crypto
    .createHash(algorithm)
    .update(string, 'utf8')
    .digest(encoding)
}
