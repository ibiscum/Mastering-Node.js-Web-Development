import { Cart } from "../data/cart_models.js";

export const countCartItems = (cart: Cart): number =>
  cart.lines.reduce((total, line) => total + line.quantity, 0);
