import { Express, NextFunction, Request, Response, Router } from "express";
import rateLimit from "express-rate-limit";
import { createAdminCatalogRoutes } from "./admin_catalog_routes";
import { createAdminOrderRoutes } from "./admin_order_routes";
import passport from "passport";
import { getConfig} from "../../config";

const users: string[] = getConfig("admin:users", []);

export const createAdminRoutes = (app: Express) => {

    // Rate limiter: max 100 requests per 15 minutes per IP
    const adminLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        standardHeaders: true, // Return rate limit info in the RateLimit-* headers
        legacyHeaders: false // Disable the X-RateLimit-* headers
    });

    app.use((req, resp, next) => {
        resp.locals.layout = false;
        resp.locals.user = req.user;
        next();
    });

    app.get("/admin/signin", (req, resp) => resp.render("admin/signin"));

    app.post("/admin/signout", (req, resp) => 
        req.logOut(() => { resp.redirect("/admin/signin") }));

    app.get("/admin/google", passport.authenticate("admin-auth"));

    app.get("/auth-signin-google", passport.authenticate("admin-auth", {
        successRedirect: "/admin/products", keepSessionInfo: true
    }));    

    const authCheck = (r: Request) => users.find(u => r.user?.email === u);

    const apiAuth = (req: Request, resp: Response, next: NextFunction) => {
        if (!authCheck(req)) {
            return resp.sendStatus(401)
        }
        next();
    };

    const cat_router = Router();
    createAdminCatalogRoutes(cat_router);
    app.use("/api/products", adminLimiter, apiAuth, cat_router);

    const order_router = Router();
    createAdminOrderRoutes(order_router);
    app.use("/api/orders", adminLimiter, apiAuth, order_router);

    const userAuth = (req: Request, resp: Response, next: NextFunction) => {
        if (!authCheck(req)) {
            return resp.redirect("/admin/signin");
        }
        next();
    };

    app.get("/admin", adminLimiter, userAuth, (req, resp) => 
        resp.redirect("/admin/products"));

    app.get("/admin/products", adminLimiter, userAuth, (req, resp) => {
        resp.locals.content = "/api/products/table";
        resp.render("admin/admin_layout");
    })

    app.get("/admin/products/edit/:id", adminLimiter, userAuth, (req, resp) => {
        resp.locals.content = `/api/products/edit/${req.params.id}`;
        resp.render("admin/admin_layout");
    })

    app.get("/admin/orders", adminLimiter, userAuth, (req, resp) => {
        resp.locals.content = "/api/orders/table";
        resp.render("admin/admin_layout");
    })
}
