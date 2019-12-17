import normalizeCategory from './normalizeCategory'

export default function normalizeParentCategory (id) {
  if ([15, 50, 48, 49, 19, 51, 54].includes(normalizeCategory(id))) {
    return 'woman'
  } else if ([18, 19].includes(normalizeCategory(id))) {
    return 'man'
  } else {
    return ''
  }
}
