import { getConfig, getSecret } from "./config/index.js";
import passport from "passport";
import { Strategy as GoogleStrategy, } from "passport-google-oauth20";
import { customer_repository } from "./data/index.js";
const callbackURL = getConfig("auth:openauth:redirectionUrl");
const clientID = getSecret("GOOGLE_CLIENT_ID");
const clientSecret = getSecret("GOOGLE_CLIENT_SECRET");
export const createAuthentication = (app) => {
    passport.use(new GoogleStrategy({
        clientID,
        clientSecret,
        callbackURL,
        scope: ["email", "profile"],
        state: true,
    }, async (accessToken, refreshToken, profile, callback) => {
        const emailAddr = profile.emails?.[0].value ?? "";
        const customer = await customer_repository.storeCustomer({
            name: profile.displayName,
            email: emailAddr,
            federatedId: profile.id,
        });
        const { id, name, email } = customer;
        return callback(null, { id, name, email });
    }));
    passport.serializeUser((user, callback) => {
        callback(null, user.id);
    });
    passport.deserializeUser((id, callbackFunc) => {
        customer_repository
            .getCustomer(id)
            .then((user) => callbackFunc(null, user));
    });
    app.use(passport.session());
};
