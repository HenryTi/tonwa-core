import { UqMan } from "../uqCore";
import { UqBuildContext } from "./UqBuildContext";
export declare class TsUqFolder {
    private buildContext;
    private readonly uq;
    private readonly uqsFolder;
    private readonly uqAlias;
    constructor(buildContext: UqBuildContext, uq: UqMan, uqsFolder: string, uqAlias: string);
    build(): void;
    private saveTuidAndIDTsIndexAndRender;
    private buildFields;
    private buildIDFields;
    private buildIDXFields;
    private buildIXFields;
    private buildFieldArr;
    private buildIDFieldArr;
    private buildIDXFieldArr;
    private buildIXFieldArr;
    private replaceTsFileFields;
    private buildFieldsFromOldText;
    private setFieldOldProp;
    private buildFieldText;
    private replaceTsFileString;
}
