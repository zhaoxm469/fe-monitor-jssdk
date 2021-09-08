import { CommonLog } from './commonLog';

export interface ApiLog extends CommonLog {
    // http状态码
    httpStatusCode: string;
    // 请求发送时间戳
    sendBeginTime: number | string;
    // api请求地址
    apiUrl: string;
    // 接口失败还是成 httpCode >200 < 299
    httpSuccess: boolean;
    // 接口请求总耗时
    totalTime: string;
    // 响应结果
    resText: string;
    // 请求参数
    reqText: string;
    // 请求方法
    methods: string;
}
