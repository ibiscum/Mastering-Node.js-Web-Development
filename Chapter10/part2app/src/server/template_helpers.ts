export const style = (stylesheet: string) => {
  return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
};

export const valueOrZero = (value: number) => {
  return value !== undefined ? value : 0;
};

export const increment = (value: number) => {
  return Number(valueOrZero(value)) + 1;
};

export const isOdd = (value: number) => {
  return Number(valueOrZero(value)) % 2;
};
