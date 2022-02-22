import { UqMan } from './uqMan';
import { UqData } from '../web';
import { TonwaBase, UqConfig } from '../core';
export declare class UQsMan {
    private readonly tonwa;
    private readonly web;
    private collection;
    proxy: any;
    uqMans: UqMan[];
    constructor(tonwa: TonwaBase);
    buildUqs(uqDataArr: UqData[], version: string, uqConfigs: UqConfig[], isBuildingUQ: boolean): Promise<string[]>;
    uq(uqName: string): UqMan;
    getUqUserRoles(uqLower: string): Promise<string[]>;
    init(uqsData: UqData[]): Promise<void>;
    load(): Promise<string[]>;
    private buildUQs;
    getUqMans(): UqMan[];
    private showReload;
    setTuidImportsLocal(): string[];
    private setInner;
}
