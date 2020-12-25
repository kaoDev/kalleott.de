export function exists<T>(value: T | undefined | null): value is T {
  return value != null;
}
