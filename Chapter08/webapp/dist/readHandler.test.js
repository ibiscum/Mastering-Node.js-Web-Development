"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_test_1 = require("node:test");
var readHandler_1 = require("./readHandler");
var assert_1 = require("assert");
var promises_1 = require("fs/promises");
var createMockResponse = function (testCtx) { return ({
    writeHead: testCtx.mock.fn(),
    setHeader: testCtx.mock.fn(),
    write: testCtx.mock.fn(),
    end: testCtx.mock.fn()
}); };
(0, node_test_1.test)("readHandler tests", function (testCtx) { return __awaiter(void 0, void 0, void 0, function () {
    var req;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req = {};
                // const resp = {
                //     setHeader: testCtx.mock.fn(),
                //     write: testCtx.mock.fn(),
                //     end: testCtx.mock.fn()
                // };
                // Test the successful outcome
                return [4 /*yield*/, testCtx.test("Successfully reads file", function (innerCtx) { return __awaiter(void 0, void 0, void 0, function () {
                        var data, resp;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    data = "json-data";
                                    innerCtx.mock.method(promises_1.default, "readFile", function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                        return [2 /*return*/, data];
                                    }); }); });
                                    resp = createMockResponse(innerCtx);
                                    // Act - perform the test 
                                    return [4 /*yield*/, (0, readHandler_1.readHandler)(req, resp)];
                                case 1:
                                    // Act - perform the test 
                                    _a.sent();
                                    // Assert - verify the results
                                    (0, assert_1.equal)(resp.setHeader.mock.calls[0].arguments[0], "Content-Type");
                                    (0, assert_1.equal)(resp.setHeader.mock.calls[0].arguments[1], "application/json");
                                    (0, assert_1.equal)(resp.write.mock.calls[0].arguments[0], data);
                                    (0, assert_1.equal)(resp.end.mock.callCount(), 1);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                // const resp = {
                //     setHeader: testCtx.mock.fn(),
                //     write: testCtx.mock.fn(),
                //     end: testCtx.mock.fn()
                // };
                // Test the successful outcome
                _a.sent();
                // Test the failure outcome
                return [4 /*yield*/, testCtx.test("Handles error reading file", function (innerCtx) { return __awaiter(void 0, void 0, void 0, function () {
                        var resp;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // Arrange - set up the test
                                    innerCtx.mock.method(promises_1.default, "readFile", function () { return Promise.reject("file error"); });
                                    resp = createMockResponse(innerCtx);
                                    // Act - perform the test 
                                    return [4 /*yield*/, (0, readHandler_1.readHandler)(req, resp)];
                                case 1:
                                    // Act - perform the test 
                                    _a.sent();
                                    // Assert - verify the results
                                    (0, assert_1.equal)(resp.writeHead.mock.calls[0].arguments[0], 500);
                                    (0, assert_1.equal)(resp.end.mock.callCount(), 1);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                // Test the failure outcome
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=readHandler.test.js.map