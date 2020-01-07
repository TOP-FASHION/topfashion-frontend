export default function normalizeCategory (id = '') {
  switch (id) {
    case 'woman':
      return 23
    case 'accessories':
      return 18
    case 'blouses':
      return 50
    case 'dresses':
      return 48
    case 'jackets':
      return 49
    case 'jumpers':
      return 19
    case 'new':
      return 55
    case 'pants':
      return 51
    case 'perfume':
      return 53
    case 'sale':
      return 54
    case 'skirts':
      return 52
    case 'bestsellers':
      return 56
    default:
      return id
  }
}
