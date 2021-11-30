import { CenterApiBase } from './uqApi';
export declare class CenterApi extends CenterApiBase {
    userAppUnits(app: number): Promise<any[]>;
    userFromId(userId: number): Promise<any>;
    userFromKey(userName: string): Promise<any>;
}
