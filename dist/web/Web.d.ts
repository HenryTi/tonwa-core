import { AppBridge } from "./appBridge";
import { CenterApi } from "./centerApi";
import { CallCenterApi, UnitxApi, UqTokenApi, UserApi } from "./uqApi";
import { HttpChannel } from './httpChannel';
import { GuestApi } from "./guestApi";
import { MessageHub } from "./messageHub";
import { WsBridge } from "./wsChannel";
import { FetchError } from "./fetchError";
import { Host } from './host';
export interface PromiseValue<T> {
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}
export declare abstract class Web {
    reload(): void;
    showReloadPage(msg: string): void;
    navBack(): void;
    onWsReceive(msg: any): Promise<void>;
    showAppView(): Promise<void>;
    logout(): void;
    onError(error: FetchError): Promise<void>;
    endWait(): void;
    startWait(): void;
    centerHost: string;
    centerToken: string | undefined;
    loginedUserId: number;
    centerChannelUI: HttpChannel;
    centerChannel: HttpChannel;
    channelUIs: {
        [name: string]: HttpChannel | (PromiseValue<any>[]);
    };
    channelNoUIs: {
        [name: string]: HttpChannel | (PromiseValue<any>[]);
    };
    channels: {
        [unitId: number]: HttpChannel;
    };
    readonly centerApi: CenterApi;
    readonly appBridge: AppBridge;
    readonly userApi: UserApi;
    readonly uqTokenApi: UqTokenApi;
    readonly callCenterapi: CallCenterApi;
    readonly unitxApi: UnitxApi;
    readonly guestApi: GuestApi;
    readonly messageHub: MessageHub;
    readonly wsBridge: WsBridge;
    readonly host: Host;
    language: string;
    culture: string;
    isBuildingUQ: boolean;
    _uqs: any;
    user: any;
    constructor();
    logoutApis(): void;
    setCenterUrl(url: string): void;
    setCenterToken(userId: number, t?: string): void;
    getCenterChannelUI(): HttpChannel;
    getCenterChannel(): HttpChannel;
    setNetToken(userId: number, token: string): void;
    clearNetToken(): void;
    resUrlFromHost(host: string): string;
}
