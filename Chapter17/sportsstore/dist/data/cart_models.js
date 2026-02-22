export const createCart = () => ({ lines: [] });
export const addLine = (cart, productId, quantity) => {
    const line = cart.lines.find((l) => l.productId == productId);
    if (line !== undefined) {
        line.quantity += quantity;
    }
    else {
        cart.lines.push({ productId, quantity });
    }
};
export const removeLine = (cart, productId) => {
    cart.lines = cart.lines.filter((l) => l.productId !== productId);
};
