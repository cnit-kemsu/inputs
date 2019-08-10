export function deserializeDate(value) {
  if (!value) return null;
  if (!(value instanceof Date)) return new Date(value);
  return value;
}