export const toLowerCaseSafe = (val: any) => String(val ?? '').toLowerCase();

export const areStringsSimilar = (a?: string, b?: string) => {
  if (a === b) return true;
  return toLowerCaseSafe(a) === toLowerCaseSafe(b);
};
