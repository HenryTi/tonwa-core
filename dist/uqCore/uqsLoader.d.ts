import { Tonva, AppConfig as AppConfigCore } from '../core';
import { UQsMan } from "./uqsMan";
export declare class UQsLoader {
    readonly tonva: Tonva;
    protected readonly appConfig: AppConfigCore;
    protected isBuildingUQ: boolean;
    uqsMan: UQsMan;
    constructor(tonva: Tonva, appConfig: AppConfigCore);
    build(): Promise<string[]>;
    private loadApp;
    loadUqs(): Promise<string[]>;
    private loadUqAppData;
    private loadUqData;
}
export declare class UQsBuildingLoader extends UQsLoader {
    build(): Promise<string[]>;
}
