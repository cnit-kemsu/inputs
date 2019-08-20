export function deserializeDate(value) {
  if (!value) return value;
  if (!(value instanceof Date)) return new Date(value);
  return value;
}