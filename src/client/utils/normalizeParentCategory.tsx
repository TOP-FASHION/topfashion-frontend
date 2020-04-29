import normalizeCategory from './normalizeCategory';

export default function normalizeParentCategory(id: any) {
  if ([15, 50, 48, 49, 19, 51, 54].includes(normalizeCategory(id))) {
    return 'woman';
  }
  if ([18, 19].includes(normalizeCategory(id))) {
    return 'man';
  }
  return undefined;
}
