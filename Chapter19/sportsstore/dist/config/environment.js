export var Env;
(function (Env) {
    Env["Development"] = "development";
    Env["Production"] = "production";
})(Env || (Env = {}));
export const getEnvironment = () => {
    const env = process.env.NODE_ENV;
    return env === undefined || env === Env.Development
        ? Env.Development
        : Env.Production;
};
