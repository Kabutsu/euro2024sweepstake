export type ObjectValues<T> = T[keyof T];

export type ObjectKeys<T> = Extract<keyof T, string>;

export function getKeyByValue<T extends Record<string, unknown>>(
  obj: T,
  value: ObjectValues<T>,
): ObjectKeys<T> | undefined {
  return (Object.keys(obj) as Array<keyof T>).find(
    (key) => obj[key] === value,
  ) as ObjectKeys<T>;
}
