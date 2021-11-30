import { Entity } from "./entity";
export declare class UqID<M extends {
    id: number;
}> extends Entity {
    get typeName(): string;
    create: boolean;
    update: boolean;
    owner: boolean;
    NO(): Promise<string>;
    getIdFromObj(value: any): number;
    cacheTuids(defer: number): void;
    loadValuesFromIds(divName: string, ids: number[]): Promise<M[]>;
    cacheTuidFieldValues(value: any): void;
    unpackTuidIds(values: string[]): any[];
}
export declare class ID extends UqID<any> {
}
export declare class UqIDX<M> extends Entity {
    get typeName(): string;
}
export declare class IDX extends UqIDX<any> {
}
export declare class UqIX<M> extends Entity {
    get typeName(): string;
}
export declare class IX extends UqIX<any> {
}