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
exports.Tonwa = exports.TonwaBase = exports.tonwa = void 0;
var Navigo_1 = require("./Navigo");
var res_1 = require("../res");
var tool_1 = require("../tool");
var logMark;
var logs = [];
var TonwaBase = /** @class */ (function () {
    function TonwaBase() {
        this.testing = false;
        this.web = this.createWeb();
    }
    TonwaBase.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.testing = tool_1.env.testing;
                        return [4 /*yield*/, this.web.host.start(this.testing)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TonwaBase;
}());
exports.TonwaBase = TonwaBase;
var Tonwa = /** @class */ (function (_super) {
    __extends(Tonwa, _super);
    function Tonwa() {
        var _this = _super.call(this) || this;
        _this.local = new tool_1.LocalData();
        _this.user = null;
        _this.arrs = ['/test', '/test/'];
        _this.windowOnError = function (event, source, lineno, colno, error) {
            debugger;
            console.error('windowOnError');
            console.error(error);
        };
        _this.windowOnUnhandledRejection = function (ev) {
            debugger;
            console.error('windowOnUnhandledRejection');
            console.error(ev.reason);
        };
        _this.windowOnClick = function (ev) {
            console.error('windowOnClick');
        };
        _this.windowOnMouseMove = function (ev) {
            console.log('navigator.userAgent: ' + navigator.userAgent);
            console.log('mouse move (%s, %s)', ev.x, ev.y);
        };
        _this.windowOnScroll = function (ev) {
            console.log('scroll event');
        };
        _this.reloadUser = function () {
            var user = _this.local.user.get();
            var curUser = _this.user;
            if (!user && !curUser)
                return;
            if ((user === null || user === void 0 ? void 0 : user.id) === (curUser === null || curUser === void 0 ? void 0 : curUser.id))
                return;
            if (!user) {
                _this.logout();
            }
            else {
                _this.logined(user);
            }
        };
        _this.reload = function () { return __awaiter(_this, void 0, void 0, function () {
            var waiting, registration, plus, webview, webView;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        waiting = new Promise(function (resolve, reject) {
                            setTimeout(resolve, 100);
                        });
                        if (!('serviceWorker' in navigator)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.race([waiting, navigator.serviceWorker.ready])];
                    case 1:
                        registration = _a.sent();
                        if (registration)
                            registration.unregister();
                        _a.label = 2;
                    case 2:
                        window.document.location.reload();
                        plus = window.plus;
                        if (plus) {
                            webview = plus.webview;
                            if (webview) {
                                if (webview.reload)
                                    webview.reload(true);
                            }
                            else {
                                webView = plus.webView;
                                if (webView) {
                                    if (webView.reload)
                                        webView.reload(true);
                                }
                            }
                            //plus.webview.reload(true)
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.navLogin = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.showLogin(function (user) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, window.history.back()];
                }); }); }, false);
                return [2 /*return*/];
            });
        }); };
        _this.navLogout = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.showLogout(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, window.history.back()];
                }); }); });
                return [2 /*return*/];
            });
        }); };
        _this.navRegister = function (params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.showRegister();
                return [2 /*return*/];
            });
        }); };
        _this.navForget = function (params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.showForget();
                return [2 /*return*/];
            });
        }); };
        _this.doneSysRoutes = false;
        _this.sysRoutes = {
            '/login': _this.navLogin,
            '/logout': _this.navLogout,
            '/register': _this.navRegister,
            '/forget': _this.navForget,
        };
        exports.tonwa = _this;
        var lang = res_1.resOptions.lang, district = res_1.resOptions.district;
        _this.language = lang;
        _this.culture = district;
        return _this;
    }
    Object.defineProperty(Tonwa.prototype, "guest", {
        //abstract clear(): void;
        get: function () {
            var guest = this.local.guest;
            if (guest === undefined)
                return 0;
            var g = guest.get();
            if (g === undefined)
                return 0;
            return g.guest;
        },
        enumerable: false,
        configurable: true
    });
    Tonwa.prototype.onReceive = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //if (this.ws === undefined) return;
                    return [4 /*yield*/, this.web.messageHub.dispatch(msg)];
                    case 1:
                        //if (this.ws === undefined) return;
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tonwa.prototype.loadUnitJson = function () {
        return __awaiter(this, void 0, void 0, function () {
            var unitJsonPath, unitRes, res, err1_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        unitJsonPath = this.unitJsonPath();
                        return [4 /*yield*/, fetch(unitJsonPath, {})];
                    case 1:
                        unitRes = _a.sent();
                        return [4 /*yield*/, unitRes.json()];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.unit];
                    case 3:
                        err1_1 = _a.sent();
                        this.local.unit.remove();
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Tonwa.prototype.getPredefinedUnitName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var el, json, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        el = document.getElementById('unit');
                        if (el) {
                            return [2 /*return*/, el.innerText];
                        }
                        el = document.getElementById('unit.json');
                        if (!!el) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadUnitJson()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        _a.trys.push([2, 3, , 5]);
                        json = el.innerHTML;
                        res = JSON.parse(json);
                        return [2 /*return*/, res.unit];
                    case 3:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.loadUnitJson()];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Tonwa.prototype.setSettings = function (settings) {
        this.navSettings = settings;
        var htmlTitle = settings.htmlTitle;
        if (htmlTitle) {
            document.title = htmlTitle;
        }
        var html = document.getElementsByTagName('html');
        var html0 = html[0];
        if (html0) {
            var version = html0 === null || html0 === void 0 ? void 0 : html0.getAttribute('data-version');
            if (version) {
                //appConfig.version = version;
            }
        }
    };
    Object.defineProperty(Tonwa.prototype, "oem", {
        get: function () {
            return this.navSettings && this.navSettings.oem;
        },
        enumerable: false,
        configurable: true
    });
    Tonwa.prototype.unitJsonPath = function () {
        var _a = document.location, origin = _a.origin, pathname = _a.pathname;
        pathname = pathname.toLowerCase();
        for (var _i = 0, _b = this.arrs; _i < _b.length; _i++) {
            var item = _b[_i];
            if (pathname.endsWith(item) === true) {
                pathname = pathname.substr(0, pathname.length - item.length);
                break;
            }
        }
        if (pathname.endsWith('/') === true || pathname.endsWith('\\') === true) {
            pathname = pathname.substr(0, pathname.length - 1);
        }
        return origin + pathname + '/unit.json';
    };
    Tonwa.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, url, ws, resHost, guest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.init.call(this)];
                    case 1:
                        _b.sent();
                        if (this.forceDevelopment === true) {
                            tool_1.env.isDevelopment = true;
                        }
                        _a = this.web.host, url = _a.url, ws = _a.ws, resHost = _a.resHost;
                        this.resUrl = this.web.resUrlFromHost(resHost);
                        this.wsHost = ws;
                        this.web.setCenterUrl(url);
                        guest = this.local.guest.get();
                        if (!(guest === undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.web.guestApi.guest()];
                    case 2:
                        guest = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!guest) {
                            debugger;
                            throw Error('guest can not be undefined');
                        }
                        this.setGuest(guest);
                        return [2 /*return*/];
                }
            });
        });
    };
    Tonwa.prototype.appStart = function (notLogined, userPassword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //if (this.appStarted === true) return;
                        //this.appStarted = true;
                        this.notLogined = notLogined;
                        this.userPassword = userPassword;
                        return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.start()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tonwa.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, ret, userName, password, logindUser, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, 11, 12]);
                        window.onerror = this.windowOnError;
                        window.onunhandledrejection = this.windowOnUnhandledRejection;
                        window.onfocus = this.reloadUser;
                        if (tool_1.env.isMobile === true) {
                            document.onselectstart = function () { return false; };
                            document.oncontextmenu = function () { return false; };
                        }
                        this.nav.clear();
                        this.nav.startWait();
                        user = this.local.user.get();
                        if (!(user === undefined)) return [3 /*break*/, 8];
                        if (!this.userPassword) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userPassword()];
                    case 1:
                        ret = _a.sent();
                        if (!ret) return [3 /*break*/, 3];
                        userName = ret.user, password = ret.password;
                        return [4 /*yield*/, this.web.userApi.login({
                                user: userName,
                                pwd: password,
                                guest: this.guest,
                            })];
                    case 2:
                        logindUser = _a.sent();
                        user = logindUser;
                        _a.label = 3;
                    case 3:
                        if (!(user === undefined)) return [3 /*break*/, 8];
                        if (!(this.notLogined !== undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.notLogined()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.showLogin(undefined)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                    case 8: return [4 /*yield*/, this.logined(user)];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 10:
                        err_2 = _a.sent();
                        console.error(err_2);
                        debugger;
                        return [3 /*break*/, 12];
                    case 11:
                        this.nav.endWait();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Tonwa.prototype.resolveRoute = function () {
        //if (this.isRouting === false) return;
        if (this.navigo === undefined)
            return;
        this.navigo.resolve();
    };
    Tonwa.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.navigo === undefined) {
            this.navigo = new Navigo_1.Navigo();
            if (this.nav.isWebNav !== true)
                this.navigo.historyAPIUpdateMethod('replaceState');
        }
        return this.navigo.on(args[0], args[1], args[2]);
    };
    Tonwa.prototype.navigateToLogin = function () {
        this.navigate('/login');
    };
    Tonwa.prototype.navigate = function (url, absolute) {
        if (!this.navigo) {
            alert('Is not in webnav state, cannot navigate to url "' + url + '"');
            return;
        }
        if (this.testing === true) {
            url += '#test';
        }
        return this.navigo.navigate(url, absolute);
    };
    Tonwa.prototype.go = function (showPage, url, absolute) {
        if (this.navigo !== undefined) {
            this.navigate(url, absolute);
        }
        else {
            showPage();
        }
    };
    Tonwa.prototype.setGuest = function (guest) {
        this.local.guest.set(guest);
        this.web.setNetToken(0, guest.token);
    };
    Tonwa.prototype.saveLocalUser = function () {
        this.local.user.set(this.user);
    };
    Tonwa.prototype.setUqRoles = function (uq, roles) {
        var userRoles = this.user.roles;
        if (!userRoles) {
            this.user.roles = {};
        }
        this.user.roles[uq] = roles;
        this.local.user.set(this.user);
    };
    Tonwa.prototype.loadMe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web.userApi.me()];
                    case 1:
                        me = _a.sent();
                        this.user.icon = me.icon;
                        this.user.nick = me.nick;
                        return [2 /*return*/];
                }
            });
        });
    };
    Tonwa.prototype.internalLogined = function (user, callback, isUserLogin) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.web.logoutApis();
                        this.user = user;
                        this.saveLocalUser();
                        this.web.setNetToken(user.id, user.token);
                        this.nav.clear();
                        return [4 /*yield*/, ((_a = this.onChangeLogin) === null || _a === void 0 ? void 0 : _a.call(this, this.user))];
                    case 1:
                        _b.sent();
                        if (!(callback !== undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, callback(user)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(this.nav.isWebNav === true)) return [3 /*break*/, 4];
                        this.navigate('/index');
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.showAppView(isUserLogin)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // ????????????
    Tonwa.prototype.logined = function (user, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalLogined(user, callback, false)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // ????????????????????????
    Tonwa.prototype.userLogined = function (user, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalLogined(user, callback, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tonwa.prototype.loginTop = function (defaultTop /*JSX.Element*/) {
        return (this.navSettings && this.navSettings.loginTop) || defaultTop;
    };
    Tonwa.prototype.logout = function (callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.local.logoutClear();
                        this.user = undefined; //{} as User;
                        this.web.logoutApis();
                        guest = this.local.guest.get();
                        this.web.setCenterToken(0, guest && guest.token);
                        this.nav.clear();
                        if (!(callback === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.start()];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, callback()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        (_a = this.onChangeLogin) === null || _a === void 0 ? void 0 : _a.call(this, undefined);
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Tonwa.prototype, "logs", {
        get: function () { return logs; },
        enumerable: false,
        configurable: true
    });
    ;
    Tonwa.prototype.log = function (msg) {
        logs.push(msg);
    };
    Tonwa.prototype.logMark = function () {
        var date = new Date();
        logMark = date.getTime();
        logs.push('log-mark: ' + date.toTimeString());
    };
    Tonwa.prototype.logStep = function (step) {
        logs.push(step + ': ' + (new Date().getTime() - logMark));
    };
    Tonwa.prototype.openSysPage = function (url) {
        var navPage = this.sysRoutes[url];
        if (navPage === undefined) {
            //alert(url + ' is not defined in sysRoutes');
            return false;
        }
        navPage(undefined);
        return true;
    };
    Tonwa.prototype.routeFromNavPage = function (navPage) {
        var _this = this;
        return function (params, queryStr) {
            if (navPage) {
                if (_this.nav.isWebNav)
                    _this.nav.clear();
                navPage(params);
            }
        };
    };
    Tonwa.prototype.onNavRoute = function (navPage) {
        this.on(this.routeFromNavPage(navPage));
    };
    /*
    onSysNavRoutes() {
        this.onNavRoutes(this.sysRoutes);
    }
    */
    Tonwa.prototype.onNavRoutes = function (navPageRoutes) {
        if (this.doneSysRoutes === false) {
            this.doneSysRoutes = true;
            this.internalOnNavRoutes(this.sysRoutes);
        }
        this.internalOnNavRoutes(navPageRoutes);
    };
    Tonwa.prototype.internalOnNavRoutes = function (navPageRoutes) {
        if (!navPageRoutes)
            return;
        this.navPageRoutes = Object.assign(this.navPageRoutes, navPageRoutes);
        var navOns = {};
        for (var route in navPageRoutes) {
            var navPage = navPageRoutes[route];
            navOns[route] = this.routeFromNavPage(navPage);
        }
        this.on(navOns);
    };
    Tonwa.prototype.checkVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var href, ret, r, parser, htmlDoc, elHtml, newVersion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        href = document.location.href;
                        href += (href.indexOf('?') >= 0 ? '&' : '?') + '_t_t_=' + new Date().getTime();
                        return [4 /*yield*/, fetch(href)];
                    case 1:
                        ret = _a.sent();
                        return [4 /*yield*/, ret.text()];
                    case 2:
                        r = _a.sent();
                        parser = new DOMParser();
                        htmlDoc = parser.parseFromString(r, 'text/html');
                        elHtml = htmlDoc.getElementsByTagName('html');
                        newVersion = elHtml[0].getAttribute('data-version');
                        return [2 /*return*/, newVersion];
                }
            });
        });
    };
    Tonwa.prototype.setCreateLogin = function (createLogin) {
        this.createLogin = createLogin;
    };
    Tonwa.prototype.changePassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLogin()];
                    case 1:
                        login = _a.sent();
                        login.showChangePassword();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tonwa.prototype.userQuit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLogin()];
                    case 1:
                        login = _a.sent();
                        login.showUserQuit();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tonwa.prototype.getLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.login)
                            return [2 /*return*/, this.login];
                        _a = this;
                        return [4 /*yield*/, this.createLogin(this)];
                    case 1: return [2 /*return*/, _a.login = _b.sent()];
                }
            });
        });
    };
    Tonwa.prototype.showLogin = function (callback, withBack) {
        return __awaiter(this, void 0, void 0, function () {
            var login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLogin()];
                    case 1:
                        login = _a.sent();
                        login.showLogin(callback, withBack);
                        return [2 /*return*/];
                }
            });
        });
    };
    Tonwa.prototype.showLogout = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLogin()];
                    case 1:
                        login = _a.sent();
                        login.showLogout(callback);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Tonwa;
}(TonwaBase));
exports.Tonwa = Tonwa;
//# sourceMappingURL=Tonwa.js.map