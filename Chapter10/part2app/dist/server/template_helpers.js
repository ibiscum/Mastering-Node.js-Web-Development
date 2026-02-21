export const style = (stylesheet) => {
    return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
};
export const valueOrZero = (value) => {
    return value !== undefined ? value : 0;
};
export const increment = (value) => {
    return Number(valueOrZero(value)) + 1;
};
export const isOdd = (value) => {
    return Number(valueOrZero(value)) % 2;
};
