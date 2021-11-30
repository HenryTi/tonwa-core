import { AppConfig, CAppBase } from "./app";
import { Nav } from "./nav";
import { Observ } from "./Observ";
import { TVs, UQsMan } from "./uq";
import { Web } from "./web";
export declare class Tonva {
    private uqsConfig;
    constructor(uqsConfig: AppConfig, nav: Nav, tvs: TVs, observ: Observ);
    readonly nav: Nav;
    readonly web: Web;
    readonly uqsMan: UQsMan;
    readonly observ: Observ;
    start<E>(CApp: new (config: AppConfig) => CAppBase<E, any>, appConfig: AppConfig, isUserLogin?: boolean): Promise<void>;
    startPage<E>(CApp: new (config: AppConfig) => CAppBase<E, any>, appConfig: AppConfig): Promise<void>;
}
