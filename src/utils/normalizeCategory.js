export default function normalizeCategory (id = '') {
  switch (id) {
    case 'accessories':
      return 18
    case 'hoodies':
      return 19
    case 'tshirts':
      return 20
    case 'jeans':
      return 23
    case 'woman':
      return 22
    case 'man':
      return 24
    case 'bestsellers':
      return 24
    case 'sale':
      return 18
    default:
      return id
  }
}
