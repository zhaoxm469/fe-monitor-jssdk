import { CommonLog } from './commonLog';

export interface PerformanceLog extends CommonLog {
    // //重定向时间
    redirectTime: number;
    //dns查询耗时
    dnsTime: number;
    // TTFB 读取页面第一个字节的时间
    ttfbTime: number;
    //DNS 缓存时间
    appcacheTime: number;
    //卸载页面的时间
    unloadTime: number;
    //tcp连接耗时
    tcpTime: number;
    //request请求耗时
    reqTime: number;
    //解析dom树耗时
    analysisTime: number;
    //白屏时间
    blankTime: number;
    //domReadyTime
    domReadyTime: number;
    // 页面完全加载时间（load）
    pageLoadTime: number;
}
