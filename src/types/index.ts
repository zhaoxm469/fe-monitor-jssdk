export type IgnoreArrayType = (RegExp | string)[];
export interface iConf {
    aId: string;
    // 用户ID
    uId: string;
    // 参数长度
    resLen: number;
    // 参数长度
    reqLen: number;
    // 是否上报ajax性能数据，错误等信息
    isAjax: boolean;
    // 是否上报JS报错
    isJsError: boolean;
    // 是否上报PV
    isPv: boolean;
    // 是否上报前端页面性能
    isPerformance: boolean;
    // 当前程序的类型 默认为H5
    appType: any;
    // 版本号
    appVersion: string;
    // 忽略上报
    ignore: RegExp | string | IgnoreArrayType;
}
