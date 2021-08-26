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

type CategoryType = 'js' | 'resource' | 'promise' | 'console.error' | 'vue';

type reporterLevel = 'error' | 'performance' | 'api' | 'pv';

enum CommonEnum {
    aId = 'a',
    url = 'ul',
    uid = 'uid',
    uuid = 'uuid',
    level = 'le',
    category = 'cg'
}

interface CommonReportLog {
    // 应用ID
    [CommonEnum.aId]?: string;
    // 页面地址
    [CommonEnum.url]?: string;
    // 用户ID
    [CommonEnum.uid]?: string;
    // 级别
    [CommonEnum.level]?: reporterLevel;
    // 分类
    [CommonEnum.category]?: CategoryType;
}

export enum errJsonEnum {
    msg = 'm',
    source = 's',
    lineno = 'l',
    colno = 'c',
    error = 'e',
    targetName = 'tn',
    pageLocation = 'pl',

    aId = 'a',
    url = 'ul',
    uid = 'uid',
    uuid = 'uuid',
    level = 'le',
    category = 'cg'
}

export interface ErrorInfo extends CommonReportLog {
    [errJsonEnum.targetName]?: string;
    [errJsonEnum.msg]?: string;
    [errJsonEnum.source]?: string;
    [errJsonEnum.lineno]?: number;
    [errJsonEnum.colno]?: number;
    [errJsonEnum.error]?: string;
    [errJsonEnum.pageLocation]?: string;
}

type ApiErrorType = 'xmlHttp' | 'fetch';

export enum ApiJsonEnum {
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

export interface ApiErrorInfo extends CommonReportLog {
    [ApiJsonEnum.httpStatusCode]?: number;
    [ApiJsonEnum.sendBeginTime]?: number;
    [ApiJsonEnum.apiUrl]?: string;
    [ApiJsonEnum.httpSuccess]?: boolean;
    [ApiJsonEnum.totalTime]?: number;
    [ApiJsonEnum.msg]?: string;
    [ApiJsonEnum.type]: ApiErrorType;
}

enum PvAliasEnum {
    // 标题是
    title = 't',
    // 来源
    referrer = 'r',
    // dpr
    devicePixelRatio = 'd',
    // document 编码
    charset = 'c'
}

export interface PvInfoLog extends CommonReportLog {
    [PvAliasEnum.title]: string;
    [PvAliasEnum.referrer]: string;
    [PvAliasEnum.devicePixelRatio]: string;
    [PvAliasEnum.charset]: string;
}
