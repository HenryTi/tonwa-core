import { UqMan } from "../uqCore";
import { UqBuildContext } from './UqBuildContext';
export declare const red = "\u001B[41m%s\u001B[0m";
export declare let lastBuildTime: number;
export declare function saveSrcTsFileIfNotExists(context: UqBuildContext, fileName: string, suffix: string, content: string): void;
export declare function saveTsFile(context: UqBuildContext, fileName: string, content: string, suffix?: string): void;
export declare function overrideTsFile(path: string, content: string): void;
export declare function saveTsFileIfNotExists(tsFilePath: string, content: string): void;
export declare function entityName(s: string): string;
export declare function getNameFromUq(uqMan: UqMan): {
    devName: string;
    uqName: string;
};
