import { AppConfig as AppConfigCore, TonwaBase } from '../core';
import { UQsMan } from "./uqsMan";
export declare class UQsLoader {
    readonly tonwa: TonwaBase;
    protected readonly appConfig: AppConfigCore;
    protected isBuildingUQ: boolean;
    uqsMan: UQsMan;
    constructor(tonwa: TonwaBase, appConfig: AppConfigCore);
    build(): Promise<string[]>;
    private loadApp;
    loadUqs(): Promise<string[]>;
    private loadUqAppData;
    private loadUqData;
}
export declare class UQsBuildingLoader extends UQsLoader {
    build(): Promise<string[]>;
}
