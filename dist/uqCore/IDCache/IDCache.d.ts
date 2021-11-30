import { UqMan } from '../uqMan';
export declare class IDCache {
    protected uqMan: UqMan;
    private queue;
    private cache;
    private waitingIds;
    private timeoutHandler;
    constructor(uqMan: UqMan);
    getValue(id: number): object;
    protected TvIdValues(waitingIds: number[]): Promise<any[]>;
    private timeOut;
    private useId;
    private moveToHead;
    remove(id: number): void;
    resetCache(id: number): void;
}
