export function getSortDirection<T extends string>(sortBy: T, ascValues: T[]): boolean {
  return ascValues.includes(sortBy)
}
