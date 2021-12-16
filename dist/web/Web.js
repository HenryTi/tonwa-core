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
exports.Web = void 0;
/* eslint-disable */
//import { Tonwa } from "../Tonwa";
var appBridge_1 = require("./appBridge");
var centerApi_1 = require("./centerApi");
var uqApi_1 = require("./uqApi");
var httpChannel_1 = require("./httpChannel");
var guestApi_1 = require("./guestApi");
var messageHub_1 = require("./messageHub");
var httpChannelUI_1 = require("./httpChannelUI");
var wsChannel_1 = require("./wsChannel");
var host_1 = require("./host");
var Web = /** @class */ (function () {
    // -- end -------------------
    function Web() {
        this.centerToken = undefined;
        this.loginedUserId = 0;
        this.channelUIs = {};
        this.channelNoUIs = {};
        this.channels = {};
        this.centerApi = new centerApi_1.CenterApi(this, 'tv/', undefined);
        this.appBridge = new appBridge_1.AppBridge(this);
        this.userApi = new uqApi_1.UserApi(this, 'tv/', undefined);
        this.uqTokenApi = new uqApi_1.UqTokenApi(this, 'tv/tie/', undefined);
        this.callCenterapi = new uqApi_1.CallCenterApi(this, '', undefined);
        var unitId = 0;
        this.unitxApi = new uqApi_1.UnitxApi(this, unitId);
        this.guestApi = new guestApi_1.GuestApi(this, 'tv/guest/', undefined);
        this.messageHub = new messageHub_1.MessageHub(this);
        this.wsBridge = new wsChannel_1.WsBridge(this);
        this.host = new host_1.Host();
    }
    // ----- 从nav搬移过来的内容
    // ===== nav搬移内容结束
    // abstract navInit(): Promise<void>
    Web.prototype.reload = function () {
        throw new Error('Method not implemented.');
    };
    Web.prototype.showReloadPage = function (msg) {
        throw new Error('Method not implemented.');
    };
    // 这个应该会去掉
    Web.prototype.navBack = function () {
        throw new Error('Method not implemented.');
    };
    // 这个是收到websocket消息的处理
    Web.prototype.onWsReceive = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    Web.prototype.showAppView = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    Web.prototype.logout = function () {
        throw new Error('Method not implemented.');
    };
    Web.prototype.onError = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw error;
            });
        });
    };
    Web.prototype.endWait = function () {
        //throw new Error('Method not implemented.');
    };
    Web.prototype.startWait = function () {
        //throw new Error('Method not implemented.');
    };
    Web.prototype.logoutApis = function () {
        this.channelUIs = {};
        this.channelNoUIs = {};
        this.channels = {};
        this.appBridge.logoutUqTokens();
    };
    Web.prototype.setCenterUrl = function (url) {
        console.log('setCenterUrl %s', url);
        this.centerHost = url;
        this.centerChannel = undefined;
        this.centerChannelUI = undefined;
    };
    Web.prototype.setCenterToken = function (userId, t) {
        this.loginedUserId = userId;
        this.centerToken = t;
        this.centerChannel = undefined;
        this.centerChannelUI = undefined;
    };
    Web.prototype.getCenterChannelUI = function () {
        if (this.centerChannelUI !== undefined)
            return this.centerChannelUI;
        return this.centerChannelUI = new httpChannel_1.CenterHttpChannel(this, this.centerHost, this.centerToken, new httpChannelUI_1.HttpChannelNavUI(this));
    };
    Web.prototype.getCenterChannel = function () {
        if (this.centerChannel !== undefined)
            return this.centerChannel;
        return this.centerChannel = new httpChannel_1.CenterHttpChannel(this, this.centerHost, this.centerToken);
    };
    Web.prototype.setNetToken = function (userId, token) {
        this.setCenterToken(userId, token);
        wsChannel_1.WSChannel.setCenterToken(token);
    };
    Web.prototype.clearNetToken = function () {
        this.setCenterToken(0, undefined);
        wsChannel_1.WSChannel.setCenterToken(undefined);
    };
    Web.prototype.resUrlFromHost = function (host) {
        return (0, host_1.resUrlFromHost)(host);
    };
    return Web;
}());
exports.Web = Web;
//# sourceMappingURL=Web.js.map