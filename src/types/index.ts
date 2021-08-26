export interface iConf {
    aId: string;
    // 是否SPA应用
    spa?: boolean;
    // 用户ID
    uId?: string;
    // JS报错
    jsError?: boolean;
    // 参数长度
    parameterLen?: number;
    // 是否上报ajax性能数据，错误等信息
    isAjax: boolean;
    // 是否上报JS报错
    isJsError: boolean;
}

export interface iFeErrorConf {
    isJs: boolean;
    isResources: boolean;
}

type CategoryType = 'js' | 'resource' | 'promise' | 'console.error';

type reporterLevel = 'error' | 'performance' | 'api';

export enum errJsonEnum {
    aId = 'a',
    level = 'le',
    msg = 'm',
    source = 's',
    lineno = 'l',
    colno = 'c',
    error = 'e',
    targetName = 'tn',
    url = 'ul',
    category = 'cg',
    pageLocation = 'pl',
    uid = 'uid',
    uuid = 'uuid'
}

export type ErrorInfo = {
    [errJsonEnum.level]?: reporterLevel;
    [errJsonEnum.category]?: CategoryType;
    [errJsonEnum.targetName]?: string;
    [errJsonEnum.msg]?: string;
    [errJsonEnum.source]?: string;
    [errJsonEnum.lineno]?: number;
    [errJsonEnum.colno]?: number;
    [errJsonEnum.error]?: string;
    [errJsonEnum.url]?: string;
    [errJsonEnum.uuid]?: string;
    [errJsonEnum.pageLocation]?: string;
};

type ApiErrorType = 'xmlHttp' | 'fetch';

export enum ApiErrJsonEnum {
    // http状态码
    httpStatusCode = 'sc',
    // 请求发送时间戳
    sendBeginTime = 'b',
    // api请求地址
    apiUrl = 'a',
    // 接口失败还是成 httpCode >200 < 299
    httpSuccess = 's',
    // 接口请求总耗时
    totalTime = 't',
    // 接口错误信息
    msg = 'm',
    // 错误类型，是fetch 还是 xml
    type = 'tp'
}

export type ApiErrorInfo = {
    [ApiErrJsonEnum.httpStatusCode]?: number;
    [ApiErrJsonEnum.sendBeginTime]?: number;
    [ApiErrJsonEnum.apiUrl]?: string;
    [ApiErrJsonEnum.httpSuccess]?: boolean;
    [ApiErrJsonEnum.totalTime]?: number;
    [ApiErrJsonEnum.msg]?: string;
    [errJsonEnum.level]: reporterLevel;
    [ApiErrJsonEnum.type]: ApiErrorType;
};
