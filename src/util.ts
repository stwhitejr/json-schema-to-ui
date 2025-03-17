export const deriveTypeFromValue = (value: unknown) => {
  const fromTypeOf = typeof value;
  if (fromTypeOf === 'object') {
    if (!value) {
      return 'null';
    }
    return Array.isArray(value) ? 'array' : 'object';
  }
  return fromTypeOf;
};

export const createPath = (paths: (string | null)[]) => {
  return paths.filter((value) => !!value).join('.');
};
