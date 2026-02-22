import { escape, unescape } from "querystring";
import { addLine, createCart, removeLine } from "../data/cart_models.js";
import * as cart_helpers from "../data/cart_helpers.js";
export const createCartMiddleware = (app) => {
    app.use((req, resp, next) => {
        resp.locals.cart = req.session.cart = req.session.cart ?? createCart();
        next();
    });
};
export const createCartRoutes = (app) => {
    app.post("/cart", (req, resp) => {
        const productId = Number.parseInt(req.body.productId);
        if (isNaN(productId)) {
            throw new Error("ID  must be an integer");
        }
        addLine(req.session.cart, productId, 1);
        resp.redirect(`/cart?returnUrl=${escape(req.body.returnUrl ?? "/")}`);
    });
    app.get("/cart", async (req, resp) => {
        const cart = req.session.cart;
        resp.render("cart", {
            cart: await cart_helpers.getCartDetail(cart),
            returnUrl: unescape(req.query.returnUrl?.toString() ?? "/"),
        });
    });
    app.post("/cart/remove", (req, resp) => {
        const id = Number.parseInt(req.body.id);
        if (!isNaN(id)) {
            removeLine(req.session.cart, id);
        }
        resp.redirect(`/cart?returnUrl=${escape(req.body.returnUrl ?? "/")}`);
    });
};
