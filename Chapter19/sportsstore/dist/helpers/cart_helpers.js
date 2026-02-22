export const countCartItems = (cart) => cart.lines.reduce((total, line) => total + line.quantity, 0);
