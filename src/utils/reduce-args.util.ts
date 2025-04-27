export function reduceArgsArrayToString(
  args: unknown[],
  argsIndex: number[] = [],
  separator = "_"
): string {
  if (!argsIndex || argsIndex.length === 0) return "";

  return argsIndex
    .map((index) => {
      const value = args[index];
      return value !== undefined && value !== null ? String(value) : "";
    })
    .filter((val) => val !== "")
    .join(separator);
}
