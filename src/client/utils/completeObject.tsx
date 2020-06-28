/**
 * Copies from the first object (donor) all properties which are missing in the second one (acceptor).
 * @param {object} acceptor - object-acceptor
 * @param {object} donor - object-donor
 * @returns {object} acceptor
 */
export default function completeObject(acceptor = {}, donor = {}) {
  for (const prop in donor) {
    // eslint-disable-next-line no-prototype-builtins
    if (donor.hasOwnProperty(prop) && !acceptor.hasOwnProperty(prop)) {
      acceptor[prop] = donor[prop];
    }
  }
  return acceptor;
}
