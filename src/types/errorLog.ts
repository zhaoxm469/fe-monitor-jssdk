import { CommonLog } from './commonLog';

// JS报错
export interface ErrorLog extends CommonLog {
    // 报错信息
    msg: string;
    // 来源
    source: string;
    // 行
    lineno: number;
    // 列
    colno: number;
    // error信息
    error: string;
}

// console.error 信息上报
export interface ConsoleErrorLog extends CommonLog {
    // 报错信息
    msg: string;
}

// 异步错误处理
export interface unhandledrejectionErrorLog extends ConsoleErrorLog {}

// 资源出错
export interface ResourcesErrorLog extends CommonLog {
    // 资源出错文件地址
    errorUrl: string;
    // 资源元素名称
    targetName: string;
}

// VUE 报错信息
export interface VueErrorLog extends ErrorLog {}
