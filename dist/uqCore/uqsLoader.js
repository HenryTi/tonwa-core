"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.UQsBuildingLoader = exports.UQsLoader = void 0;
var uqsMan_1 = require("./uqsMan");
var tool_1 = require("../tool");
var web_1 = require("../web");
var UQsLoader = /** @class */ (function () {
    function UQsLoader(tonwa, appConfig) {
        this.isBuildingUQ = false;
        this.appConfig = appConfig;
        this.tonwa = tonwa;
    }
    UQsLoader.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, app, uqs, retErrors;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.appConfig, app = _a.app, uqs = _a.uqs;
                        if (!app) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadApp()];
                    case 1:
                        retErrors = _b.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!uqs) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loadUqs()];
                    case 3:
                        retErrors = _b.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error('either uqs or app must be defined in AppConfig');
                    case 5: return [2 /*return*/, retErrors];
                }
            });
        });
    };
    /*
    async buildUQs(uqsConfig: AppConfig) {
        let {uqs, tvs, version} = uqsConfig;
        let retErrors:string[];
        if (uqs) {
            UQsMan.isBuildingUQ = true;
            retErrors = await this.loadUqs();
        }
        else {
            throw new Error('either uqs or app must be defined in AppConfig');
        }
        return retErrors;
    }
    */
    // 返回 errors, 每个uq一行
    UQsLoader.prototype.loadApp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, app, uqConfigs, version, name, dev, uqsManApp, appOwner, appName, localData, uqAppData, data, _i, _b, uq, id, uqs;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.appConfig, app = _a.app, uqConfigs = _a.uqs, version = _a.version;
                        name = app.name, dev = app.dev;
                        uqsManApp = new UQsManApp(this.tonwa, "".concat(dev.name, "/").concat(name));
                        this.uqsMan = uqsManApp;
                        appOwner = uqsManApp.appOwner, appName = uqsManApp.appName, localData = uqsManApp.localData;
                        uqAppData = localData.get();
                        if (!(!uqAppData || uqAppData.version !== version)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loadUqAppData(appOwner, appName)];
                    case 1:
                        uqAppData = _d.sent();
                        if (!uqAppData.id) {
                            return [2 /*return*/, [
                                    "".concat(appOwner, "/").concat(appName, "\u4E0D\u5B58\u5728\u3002\u8BF7\u4ED4\u7EC6\u68C0\u67E5app\u5168\u540D\u3002")
                                ]];
                        }
                        uqAppData.version = version;
                        if (!uqConfigs) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadUqData(uqConfigs)];
                    case 2:
                        data = _d.sent();
                        (_c = uqAppData.uqs).push.apply(_c, data);
                        _d.label = 3;
                    case 3:
                        localData.set(uqAppData);
                        // 
                        for (_i = 0, _b = uqAppData.uqs; _i < _b.length; _i++) {
                            uq = _b[_i];
                            uq.newVersion = true;
                        }
                        _d.label = 4;
                    case 4:
                        id = uqAppData.id, uqs = uqAppData.uqs;
                        uqsManApp.id = id;
                        return [4 /*yield*/, this.uqsMan.buildUqs(uqs, version, uqConfigs, this.isBuildingUQ)];
                    case 5: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    // 返回 errors, 每个uq一行
    UQsLoader.prototype.loadUqs = function ( /*uqConfigs: UqConfig[], version:string, tvs:TVs*/) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, uqConfigs, version, uqs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.appConfig, uqConfigs = _a.uqs, version = _a.version;
                        this.uqsMan = new uqsMan_1.UQsMan(this.tonwa);
                        return [4 /*yield*/, this.loadUqData(uqConfigs)];
                    case 1:
                        uqs = _b.sent();
                        return [4 /*yield*/, this.uqsMan.buildUqs(uqs, version, uqConfigs, this.isBuildingUQ)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UQsLoader.prototype.loadUqAppData = function (appOwner, appName) {
        return __awaiter(this, void 0, void 0, function () {
            var centerAppApi, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        centerAppApi = new web_1.CenterAppApi(this.tonwa.web, 'tv/', undefined);
                        return [4 /*yield*/, centerAppApi.appUqs(appOwner, appName)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UQsLoader.prototype.loadUqData = function (uqConfigs) {
        return __awaiter(this, void 0, void 0, function () {
            var uqs, centerAppApi, ret, _a, err, i, _b, ownerAlias, alias;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        uqs = uqConfigs.map(function (v) {
                            var dev = v.dev, name = v.name, version = v.version, alias = v.alias;
                            var owner = dev.name, ownerAlias = dev.alias;
                            return { owner: owner, ownerAlias: ownerAlias, name: name, version: version, alias: alias };
                        });
                        centerAppApi = new web_1.CenterAppApi(this.tonwa.web, 'tv/', undefined);
                        if (!(uqs.length === 0)) return [3 /*break*/, 1];
                        _a = [];
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, centerAppApi.uqs(uqs)];
                    case 2:
                        _a = _c.sent();
                        _c.label = 3;
                    case 3:
                        ret = _a;
                        if (ret.length < uqs.length) {
                            err = "\u4E0B\u5217UQ\uFF1A\n".concat(uqs.map(function (v) { return "".concat(v.owner, "/").concat(v.name); }).join('\n'), "\u4E4B\u4E00\u4E0D\u5B58\u5728");
                            console.error(err);
                            throw Error(err);
                        }
                        for (i = 0; i < uqs.length; i++) {
                            _b = uqs[i], ownerAlias = _b.ownerAlias, alias = _b.alias;
                            ret[i].ownerAlias = ownerAlias;
                            ret[i].uqAlias = alias;
                        }
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    return UQsLoader;
}());
exports.UQsLoader = UQsLoader;
var UQsManApp = /** @class */ (function (_super) {
    __extends(UQsManApp, _super);
    function UQsManApp(tonwa, tonwaAppName /*, tvs:TVs*/) {
        var _this = _super.call(this, tonwa /*, tvs*/) || this;
        var parts = tonwaAppName.split('/');
        if (parts.length !== 2) {
            throw new Error('tonwaApp name must be / separated, owner/app');
        }
        _this.appOwner = parts[0];
        _this.appName = parts[1];
        _this.localMap = tool_1.env.localDb.map(tonwaAppName);
        _this.localData = _this.localMap.child('uqData');
        return _this;
    }
    return UQsManApp;
}(uqsMan_1.UQsMan));
var UQsBuildingLoader = /** @class */ (function (_super) {
    __extends(UQsBuildingLoader, _super);
    function UQsBuildingLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UQsBuildingLoader.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uqs, retErrors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //nav.forceDevelopment = true;
                        tool_1.env.isDevelopment = true;
                        //await nav.init();
                        //await this.tonwa.web.navInit();
                        return [4 /*yield*/, this.tonwa.init()];
                    case 1:
                        //await nav.init();
                        //await this.tonwa.web.navInit();
                        _a.sent();
                        this.isBuildingUQ = true;
                        uqs = this.appConfig.uqs;
                        if (!uqs) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadUqs()];
                    case 2:
                        retErrors = _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error('uqs must be defined in AppConfig');
                    case 4: return [2 /*return*/, retErrors];
                }
            });
        });
    };
    return UQsBuildingLoader;
}(UQsLoader));
exports.UQsBuildingLoader = UQsBuildingLoader;
//# sourceMappingURL=uqsLoader.js.map