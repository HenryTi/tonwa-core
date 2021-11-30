import { UqBuildContext } from "./UqBuildContext";
export declare class TsTemplate {
    private readonly buildContext;
    constructor(buildContext: UqBuildContext);
    readonly tsHeader: string;
    get tsApp(): string;
    get tsCApp(): string;
    get tsCBase(): string;
    get tsIndex(): string;
    get tsVMain(): string;
}
