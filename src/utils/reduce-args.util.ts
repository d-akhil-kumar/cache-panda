export function reduceArgsArrayToString(
  args: unknown[],
  argsIndex: number[] = [],
  separator = "_"
): string {
  if (!args || args.length === 0) return "";

  const selectedArgs = argsIndex.length
    ? argsIndex.map((index) => JSON.stringify(args[index])).filter(Boolean)
    : args.map((arg) => JSON.stringify(arg));

  return selectedArgs.join(separator);
}
