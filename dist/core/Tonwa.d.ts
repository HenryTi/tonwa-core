/// <reference types="react" />
import { Navigo, Hooks, NamedRoute, RouteFunc } from "./Navigo";
import { Nav, NavPage } from './Nav';
import { Web } from '../web';
import { User, Guest } from '../tool';
import { Login } from './Login';
export interface NavSettings {
    oem?: string;
    loginTop?: JSX.Element;
    privacy?: string;
    htmlTitle?: string;
}
export declare let tonwa: Tonwa;
export declare abstract class Tonwa {
    readonly web: Web;
    private wsHost;
    private local;
    private navigo;
    navSettings: NavSettings;
    user: User;
    testing: boolean;
    language: string;
    culture: string;
    resUrl: string;
    constructor();
    protected abstract showRegister(): Promise<void>;
    protected abstract showForget(): Promise<void>;
    abstract createWeb(): Web;
    abstract createObservableMap<K, V>(): Map<K, V>;
    abstract get nav(): Nav;
    abstract privacyEntry(): void;
    abstract resetAll: () => void;
    abstract showAppView(isUserLogin?: boolean): Promise<void>;
    get guest(): number;
    onReceive(msg: any): Promise<void>;
    private loadUnitJson;
    private getPredefinedUnitName;
    private loadPredefinedUnit;
    setSettings(settings?: NavSettings): void;
    get oem(): string;
    hashParam: string;
    private centerHost;
    private arrs;
    private unitJsonPath;
    private windowOnError;
    private windowOnUnhandledRejection;
    private windowOnClick;
    private windowOnMouseMove;
    private windowOnScroll;
    forceDevelopment: boolean;
    init(): Promise<void>;
    reloadUser: () => void;
    private notLogined?;
    private userPassword?;
    appStart(notLogined?: () => Promise<void>, userPassword?: () => Promise<{
        user: string;
        password: string;
    }>): Promise<void>;
    start(): Promise<void>;
    resolveRoute(): void;
    on(routeFunc: RouteFunc, hooks?: Hooks): Navigo;
    on(url: string, routeFunc: RouteFunc, hooks?: Hooks): Navigo;
    on(regex: RegExp, routeFunc: RouteFunc, hooks?: Hooks): Navigo;
    on(options: {
        [url: string]: RouteFunc | NamedRoute;
    }): Navigo;
    navigateToLogin(): void;
    navigate(url: string, absolute?: boolean): Navigo;
    go(showPage: () => void, url: string, absolute?: boolean): void;
    setGuest(guest: Guest): void;
    saveLocalUser(): void;
    setUqRoles(uq: string, roles: string[]): void;
    loadMe(): Promise<void>;
    private internalLogined;
    onChangeLogin: (user: User) => Promise<void>;
    logined(user: User, callback?: (user: User) => Promise<void>): Promise<void>;
    userLogined(user: User, callback?: (user: User) => Promise<void>): Promise<void>;
    loginTop(defaultTop: JSX.Element): JSX.Element;
    logout(callback?: () => Promise<void>): Promise<void>;
    get logs(): string[];
    log(msg: string): void;
    logMark(): void;
    logStep(step: string): void;
    reload: () => Promise<void>;
    openSysPage(url: string): boolean;
    private navLogin;
    private navLogout;
    private navRegister;
    private navForget;
    private navPageRoutes;
    private routeFromNavPage;
    onNavRoute(navPage: NavPage): void;
    private doneSysRoutes;
    private sysRoutes;
    onNavRoutes(navPageRoutes: {
        [url: string]: NavPage;
    }): void;
    private internalOnNavRoutes;
    checkVersion(): Promise<string>;
    private createLogin;
    setCreateLogin(createLogin: (tonwa: Tonwa) => Promise<Login>): void;
    changePassword(): Promise<void>;
    userQuit(): Promise<void>;
    private login;
    private getLogin;
    showLogin(callback?: (user: User) => Promise<void>, withBack?: boolean): Promise<void>;
    showLogout(callback?: () => Promise<void>): Promise<void>;
}