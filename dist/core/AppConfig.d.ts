export interface DevConfig {
    name: string;
    alias?: string;
    memo?: string;
}
export interface UqConfig {
    dev: DevConfig;
    name: string;
    alias?: string;
    version?: string;
    memo?: string;
}
export interface UqsConfig {
    app?: {
        dev: DevConfig;
        name: string;
        version?: string;
    };
    uqs?: UqConfig[];
}
export interface AppConfig extends UqsConfig {
    version: string;
}
