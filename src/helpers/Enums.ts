export function getEnumValues<T extends object>(enumObj: T): T[keyof T][] {
  return Object.values(enumObj).filter(
    (value) => typeof value === "string" || typeof value === "number",
  ) as T[keyof T][];
}
