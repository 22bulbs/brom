export default function objectHasKey(object, key) {
  if (typeof object[key] !== 'object') return false;
  if (!Object.keys(object[key]).length > 0) return false;
  return true;
}
