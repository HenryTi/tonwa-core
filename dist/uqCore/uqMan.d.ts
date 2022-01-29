import { UqApi, UqData } from '../web';
import { Tonwa, UqConfig } from '../core';
import { Tuid, TuidDiv, TuidBox } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { Map } from './map';
import { Pending } from './pending';
import { LocalMap, LocalCache } from '../tool';
import { UqEnum } from './enum';
import { Entity } from './entity';
import { ID, IX, IDX } from './ID';
import { IDCache } from './IDCache';
import { Web } from '../web';
export declare type FieldType = 'id' | 'tinyint' | 'smallint' | 'int' | 'bigint' | 'dec' | 'float' | 'double' | 'char' | 'text' | 'datetime' | 'date' | 'time' | 'timestamp' | 'enum';
export declare function fieldDefaultValue(type: FieldType): 0 | "" | "2000-1-1" | "0:00";
export interface Field {
    name: string;
    type: FieldType;
    tuid?: string;
    arr?: string;
    null?: boolean;
    size?: number;
    owner?: string;
    _tuid?: TuidBox;
}
export interface ArrFields {
    name: string;
    fields: Field[];
    id?: string;
    order?: string;
}
export interface FieldMap {
    [name: string]: Field;
}
export interface SchemaFrom {
    owner: string;
    uq: string;
}
export interface TuidModify {
    max: number;
    seconds: number;
}
interface ParamPage {
    start: number;
    end?: number;
    size: number;
}
export interface ParamActIX<T> {
    IX: IX;
    ID?: ID;
    IXs?: {
        IX: IX;
        ix: number;
    }[];
    values: {
        ix: number;
        xi: number | T;
    }[];
}
export interface ParamActIXSort {
    IX: IX;
    ix: number;
    id: number;
    after: number;
}
export interface ParamActDetail<M, D> {
    main: {
        ID: ID;
        value: M;
    };
    detail: {
        ID: ID;
        values: D[];
    };
}
export interface RetActDetail {
    main: number;
    detail: number[];
}
export interface ParamActDetail2<M, D, D2> extends ParamActDetail<M, D> {
    detail2: {
        ID: ID;
        values: D2[];
    };
}
export interface RetActDetail2 extends RetActDetail {
    detail2: number[];
}
export interface ParamActDetail3<M, D, D2, D3> extends ParamActDetail2<M, D, D2> {
    detail3: {
        ID: ID;
        values: D3[];
    };
}
export interface RetActDetail3 extends RetActDetail2 {
    detail3: number[];
}
export interface ParamQueryID {
    ID?: ID;
    IX?: (IX | string)[];
    IDX?: (ID | IDX)[];
    id?: number | number[];
    key?: {
        [key: string]: string | number;
    };
    ix?: number;
    idx?: number | number[];
    keyx?: {
        [key: string]: string | number;
    };
    page?: ParamPage;
    order?: 'desc' | 'asc';
}
export interface ParamIDNO {
    ID: ID;
    stamp?: undefined;
}
export interface ParamIDDetailGet {
    id: number;
    main: ID;
    detail: ID;
    detail2?: ID;
    detail3?: ID;
}
export interface ParamID {
    IDX: (ID | IDX) | (ID | IDX)[];
    id: number | number[];
    order?: 'asc' | 'desc';
    page?: ParamPage;
}
export interface ParamKeyID {
    ID: ID;
    IDX?: (ID | IDX)[];
    IX?: IX[];
    key: {
        [key: string]: string | number;
    };
    ix?: number;
    page?: ParamPage;
}
export interface ParamIX {
    IX: IX;
    IX1?: IX;
    ix: number | number[];
    IDX?: (ID | IDX)[];
    page?: ParamPage;
}
export interface ParamKeyIX {
    ID: ID;
    key: {
        [key: string]: string | number;
    };
    IX: IX;
    IDX?: (ID | IDX)[];
    page?: ParamPage;
}
export interface ParamIDLog {
    IDX: (ID | IDX);
    field: string;
    id: number;
    log: 'each' | 'day' | 'week' | 'month' | 'year';
    timeZone?: number;
    far?: number;
    near?: number;
    page: ParamPage;
}
export interface ParamIDSum {
    IDX: IDX;
    field: string[];
    id: number | number[];
    far?: number;
    near?: number;
}
export interface ParamIDxID {
    ID: ID;
    IX: IX;
    ID2: ID;
    page?: ParamPage;
}
export interface IDXValue {
    value: number;
    time?: number | Date;
    setAdd: '=' | '+';
}
export interface ParamIDinIX {
    ID: ID;
    id: number;
    IX: IX;
    page?: ParamPage;
}
export interface ParamIDTree {
    ID: ID;
    parent: number;
    key: string | number;
    level?: number;
    page?: ParamPage;
}
export interface Uq {
    getAdmins(): Promise<{
        id: number;
        role: number;
    }[]>;
    $: UqMan;
    Acts(param: any): Promise<any>;
    ActIX<T>(param: ParamActIX<T>): Promise<number[]>;
    ActIXSort(param: ParamActIXSort): Promise<void>;
    ActIDProp(ID: ID, name: string, value: any): Promise<void>;
    ActDetail<M, D>(param: ParamActDetail<M, D>): Promise<RetActDetail>;
    ActDetail<M, D, D2>(param: ParamActDetail2<M, D, D2>): Promise<RetActDetail2>;
    ActDetail<M, D, D2, D3>(param: ParamActDetail3<M, D, D2, D3>): Promise<RetActDetail3>;
    QueryID<T>(param: ParamQueryID): Promise<T[]>;
    IDNO(param: ParamIDNO): Promise<string>;
    IDDetailGet<M, D>(param: ParamIDDetailGet): Promise<[M[], D[]]>;
    IDDetailGet<M, D, D2>(param: ParamIDDetailGet): Promise<[M[], D[], D2[]]>;
    IDDetailGet<M, D, D2, D3>(param: ParamIDDetailGet): Promise<[M[], D[], D2[], D3[]]>;
    ID<T>(param: ParamID): Promise<T[]>;
    IXr<T>(param: ParamIX): Promise<T[]>;
    KeyID<T>(param: ParamKeyID): Promise<T[]>;
    IX<T>(param: ParamIX): Promise<T[]>;
    KeyIX<T>(param: ParamKeyIX): Promise<T[]>;
    IDLog<T>(param: ParamIDLog): Promise<T[]>;
    IDSum<T>(param: ParamIDSum): Promise<T[]>;
    IDxID<T, T2>(param: ParamIDxID): Promise<[T[], T2[]]>;
    IDinIX<T>(param: ParamIDinIX): Promise<T & {
        $in: boolean;
    }[]>;
    IDTree<T>(param: ParamIDTree): Promise<T[]>;
    IDTv(ids: number[]): Promise<any[]>;
}
export declare class UqMan {
    readonly entities: {
        [name: string]: Entity;
    };
    private readonly enums;
    private readonly actions;
    private readonly queries;
    readonly ids: {
        [name: string]: ID;
    };
    private readonly idxs;
    private readonly ixs;
    private readonly sheets;
    private readonly books;
    private readonly maps;
    private readonly histories;
    private readonly pendings;
    private readonly tuidsCache;
    private readonly localEntities;
    idCache: IDCache;
    proxy: any;
    readonly localMap: LocalMap;
    readonly localModifyMax: LocalCache;
    readonly tuids: {
        [name: string]: Tuid;
    };
    readonly newVersion: boolean;
    readonly uqOwner: string;
    readonly uqName: string;
    readonly name: string;
    readonly uqApi: UqApi;
    readonly id: number;
    readonly tonwa: Tonwa;
    readonly web: Web;
    uqVersion: number;
    config: UqConfig;
    constructor(tonwa: Tonwa, uqData: UqData);
    getID(name: string): ID;
    getIDX(name: string): IDX;
    getIX(name: string): IX;
    private roles;
    getRoles(): Promise<string[]>;
    tuid(name: string): Tuid;
    tuidDiv(name: string, div: string): TuidDiv;
    action(name: string): Action;
    sheet(name: string): Sheet;
    query(name: string): Query;
    book(name: string): Book;
    map(name: string): Map;
    history(name: string): History;
    pending(name: string): Pending;
    sheetFromTypeId(typeId: number): Sheet;
    allRoles: string[];
    readonly tuidArr: Tuid[];
    readonly actionArr: Action[];
    readonly queryArr: Query[];
    readonly idArr: ID[];
    readonly idxArr: IDX[];
    readonly ixArr: IX[];
    readonly enumArr: UqEnum[];
    readonly sheetArr: Sheet[];
    readonly bookArr: Book[];
    readonly mapArr: Map[];
    readonly historyArr: History[];
    readonly pendingArr: Pending[];
    init(): Promise<void>;
    loadEntities(): Promise<string>;
    buildEntities(entities: any): void;
    private buildTuids;
    loadEntitySchema(entityName: string): Promise<any>;
    loadAllSchemas(): Promise<void>;
    getTuid(name: string): Tuid;
    private buildAccess;
    cacheTuids(defer: number): void;
    private setEntity;
    newEnum(name: string, id: number): UqEnum;
    newAction(name: string, id: number): Action;
    private newTuid;
    newQuery(name: string, id: number): Query;
    private newBook;
    private newMap;
    private newHistory;
    private newPending;
    private newSheet;
    private newID;
    private newIDX;
    private newIX;
    private fromType;
    private fromObj;
    private buildSheet;
    buildFieldTuid(fields: Field[], mainFields?: Field[]): void;
    buildArrFieldsTuid(arrFields: ArrFields[], mainFields: Field[]): void;
    pullModify(modifyMax: number): void;
    getUqKey(): string;
    getUqKeyWithConfig(): string;
    hasEntity(name: string): boolean;
    createProxy(): any;
    showReload(msg: string): void;
    private apiPost;
    private apiActs;
    protected Acts: (param: any) => Promise<any>;
    protected getAdmins: () => Promise<{
        id: number;
        role: number;
    }[]>;
    protected $Acts: (param: any) => Promise<any>;
    private apiActIX;
    protected ActIX: (param: ParamActIX<any>) => Promise<number[]>;
    protected $ActIX: (param: ParamActIX<any>) => Promise<string>;
    private apiActIxSort;
    protected ActIXSort: (param: ParamActIXSort) => Promise<void>;
    protected $ActIXSort: (param: ParamActIXSort) => Promise<string>;
    protected ActIDProp: (ID: ID, name: string, value: any) => Promise<void>;
    private apiActDetail;
    protected ActDetail: (param: ParamActDetail<any, any>) => Promise<any>;
    protected $ActDetail: (param: ParamActDetail<any, any>) => Promise<any>;
    private apiQueryID;
    protected QueryID: (param: ParamQueryID) => Promise<any[]>;
    protected $QueryID: (param: ParamQueryID) => Promise<any[]>;
    private apiIDTv;
    IDTv: (ids: number[]) => Promise<any[]>;
    protected $IDTv: (ids: number[]) => Promise<any>;
    private apiIDNO;
    protected IDNO: (param: ParamIDNO) => Promise<string>;
    protected $IDNO: (param: ParamIDNO) => Promise<string>;
    private apiIDDetailGet;
    IDDetailGet: (param: ParamIDDetailGet) => Promise<any>;
    protected $IDDetailGet: (param: ParamIDDetailGet) => Promise<any>;
    private IDXToString;
    private apiID;
    protected ID: (param: ParamID) => Promise<any[]>;
    protected $ID: (param: ParamID) => Promise<string>;
    private apiKeyID;
    protected KeyID: (param: ParamKeyID) => Promise<any[]>;
    protected $KeyID: (param: ParamKeyID) => Promise<string>;
    private apiIX;
    protected IX: (param: ParamIX) => Promise<any[]>;
    protected $IX: (param: ParamIX) => Promise<string>;
    private apiIXr;
    protected IXr: (param: ParamIX) => Promise<any[]>;
    protected $IXr: (param: ParamIX) => Promise<any[]>;
    private apiKeyIX;
    protected KeyIX: (param: ParamKeyIX) => Promise<any[]>;
    protected $KeyIX: (param: ParamKeyIX) => Promise<any[]>;
    private apiIDLog;
    protected IDLog: (param: ParamIDLog) => Promise<any[]>;
    protected $IDLog: (param: ParamIDLog) => Promise<string>;
    private apiIDSum;
    protected IDSum: (param: ParamIDSum) => Promise<any[]>;
    protected $IDSum: (param: ParamIDSum) => Promise<string>;
    private apiIDinIX;
    protected IDinIX: (param: ParamIDinIX) => Promise<any | {
        $in: boolean;
    }[]>;
    protected $IDinIX: (param: ParamIDinIX) => Promise<string>;
    private apiIDxID;
    protected IDxID: (param: ParamIDxID) => Promise<any[]>;
    protected $IDxID: (param: ParamIDxID) => Promise<string>;
    private apiIDTree;
    protected IDTree: (param: ParamIDTree) => Promise<any[]>;
    protected $IDTree: (param: ParamIDTree) => Promise<string>;
}
export {};
