export interface iConf {
    aId: string;
    // 是否SPA应用
    spa?: boolean;
    // 用户ID
    uId?: string;
    // JS报错
    jsError?: boolean;
    // 参数长度
    resLen?: number;
    // 参数长度
    reqLen?: number;
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
