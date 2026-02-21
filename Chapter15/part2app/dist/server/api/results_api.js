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
exports.ResultWebService = void 0;
const data_1 = __importDefault(require("../data"));
const jsonpatch = __importStar(require("fast-json-patch"));
const validation_functions_1 = require("./validation_functions");
const results_api_validation_1 = require("./results_api_validation");
class ResultWebService {
    getOne(id) {
        return data_1.default.getResultById(id);
    }
    getMany(query) {
        if (query.name) {
            return data_1.default.getResultsByName(query.name, 10);
        }
        else {
            return data_1.default.getAllResults(10);
        }
    }
    async store(data) {
        const { name, age, years } = data;
        const nextage = age + years;
        const id = await data_1.default.saveResult({
            id: 0,
            name,
            age,
            years,
            nextage,
        });
        return await data_1.default.getResultById(id);
    }
    delete(id) {
        return data_1.default.delete(Number.parseInt(id));
    }
    replace(id, data) {
        const { name, age, years, nextage } = data;
        const validated = (0, validation_functions_1.validateModel)({ name, age, years, nextage }, results_api_validation_1.ResultModelValidation);
        return data_1.default.update({ id, ...validated });
    }
    async modify(id, data) {
        const dbData = await this.getOne(id);
        if (dbData !== undefined) {
            return await this.replace(id, jsonpatch.applyPatch(dbData, data).newDocument);
        }
    }
}
exports.ResultWebService = ResultWebService;
