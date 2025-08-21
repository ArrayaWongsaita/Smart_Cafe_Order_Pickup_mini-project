export function createAlreadyExistsMessage(
  type: string,
  value: string,
): string {
  return `The ${type} "${value}" already exists.`;
}

export function createNotFoundMessage(type: string, value: string): string {
  return `The ${type} "${value}" was not found.`;
}
