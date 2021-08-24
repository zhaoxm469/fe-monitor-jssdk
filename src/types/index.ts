export interface iConf {
    aId: string;
    // 是否SPA应用
    spa?: boolean;
    // 用户ID
    uId?: string;
    // JS报错
    jsError?: boolean;
}

export interface iFeErrorConf {
    isJs: boolean;
    isResources: boolean;
}

export type ErrorInfo = {
    [errJsonEnum.aId]: string;
    [errJsonEnum.type]: string;
    [errJsonEnum.message]: string;
    [errJsonEnum.source]: string;
    [errJsonEnum.lineno]: number;
    [errJsonEnum.colno]: number;
    [errJsonEnum.error]: string;
};

export enum errJsonEnum {
    aId = 'a',
    type = 't',
    message = 'm',
    source = 's',
    lineno = 'l',
    colno = 'c',
    error = 'e'
}

export enum reporterTypeEnum {
    ERROR = 'error',
    performance = 'performance'
}
