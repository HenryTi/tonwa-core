import { Tonwa, AppConfig as AppConfigCore } from '../core';
import { UQsMan } from "./uqsMan";
export declare class UQsLoader {
    readonly tonwa: Tonwa;
    protected readonly appConfig: AppConfigCore;
    protected isBuildingUQ: boolean;
    uqsMan: UQsMan;
    constructor(tonwa: Tonwa, appConfig: AppConfigCore);
    build(): Promise<string[]>;
    private loadApp;
    loadUqs(): Promise<string[]>;
    private loadUqAppData;
    private loadUqData;
}
export declare class UQsBuildingLoader extends UQsLoader {
    build(): Promise<string[]>;
}
