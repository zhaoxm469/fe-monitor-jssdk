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
    // 是否上报PV
    isPv?: boolean;
    // 是否上报UV
    isUv?: boolean;
    // 是否上报前端页面性能
    isPerformance: boolean;
    // 当前程序的类型 默认为H5
    appType?: any;
}

type CategoryType = 'js' | 'resource' | 'promise' | 'console.error' | 'vue';

type reporterLevel = 'error' | 'performance' | 'api' | 'pv';

export enum CommonEnum {
    referrer = 'rer',
    aId = 'a',
    url = 'ul',
    uid = 'uid',
    uuid = 'uuid',
    level = 'le',
    category = 'cg',
    pageLocation = 'pl',
    pageWh = 'pwh',
    selector = 'st',
    viewPoint = 'vpt',
    handleType = 'htp'
}

export interface CommonReportLog {
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
    // 当前发生事件的页面
    [CommonEnum.pageLocation]?: string;
    // 屏幕视口大小
    [CommonEnum.viewPoint]?: string;
    // 用户触发事件的行为类型
    [CommonEnum.handleType]?: string;
    // 用户触发事件的行为类型
    [CommonEnum.selector]?: string;
    // 来源
    [CommonEnum.referrer]?: string;
}

export enum errJsonEnum {
    msg = 'm',
    source = 's',
    lineno = 'l',
    colno = 'c',
    error = 'e',
    targetName = 'tn',

    aId = 'a',
    url = 'ul',
    uid = 'uid',
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
}

type ApiType = 'xhr' | 'fetch';

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
    // 响应结果
    resText = 'm',
    // 请求参数
    reqText = 'm',
    // 请求方法
    methods = 'mds'
}

export interface ApiInfo extends CommonReportLog {
    [ApiJsonEnum.httpStatusCode]?: number;
    [ApiJsonEnum.sendBeginTime]?: number;
    [ApiJsonEnum.apiUrl]?: string;
    [ApiJsonEnum.httpSuccess]?: boolean;
    [ApiJsonEnum.totalTime]?: number;
    [ApiJsonEnum.resText]?: string;
    [ApiJsonEnum.reqText]?: string;
    [ApiJsonEnum.methods]: string;
}

export enum PvAliasEnum {
    // 标题是
    title = 't',
    // dpr
    devicePixelRatio = 'd',
    // document 编码
    charset = 'c'
}

export interface PvInfoLog extends CommonReportLog {
    [PvAliasEnum.title]: string;
    [PvAliasEnum.devicePixelRatio]: string;
    [PvAliasEnum.charset]: string;
}
