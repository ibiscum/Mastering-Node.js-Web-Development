"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApi = void 0;
const results_api_js_1 = require("./results_api.js");
const validation_adapter_js_1 = require("./validation_adapter.js");
const results_api_validation_js_1 = require("./results_api_validation.js");
const feathers_adapter_js_1 = require("./feathers_adapter.js");
const feathers_1 = require("@feathersjs/feathers");
const express_1 = __importStar(require("@feathersjs/express"));
const validation_types_js_1 = require("./validation_types.js");
const index_js_1 = require("../auth/index.js");
const passport_1 = __importDefault(require("passport"));
const createApi = (app) => {
    const feathersApp = (0, express_1.default)((0, feathers_1.feathers)(), app).configure((0, express_1.rest)());
    const service = new validation_adapter_js_1.Validator(new results_api_js_1.ResultWebService(), results_api_validation_js_1.ResultWebServiceValidation);
    feathersApp.use("/api/results", passport_1.default.authenticate("jwt", { session: false }), (req, resp, next) => {
        req.feathers.user = req.user;
        req.feathers.authenticated = req.authenticated = req.user !== undefined;
        next();
    }, new feathers_adapter_js_1.FeathersWrapper(service));
    feathersApp.hooks({
        error: {
            all: [
                (ctx) => {
                    if (ctx.error instanceof validation_types_js_1.ValidationError) {
                        ctx.http = { status: 400 };
                        ctx.error = undefined;
                    }
                },
            ],
        },
        before: {
            create: [(0, index_js_1.roleHook)("Users")],
            remove: [(0, index_js_1.roleHook)("Admins")],
            update: [(0, index_js_1.roleHook)("Admins")],
            patch: [(0, index_js_1.roleHook)("Admins")],
        },
    });
};
exports.createApi = createApi;
