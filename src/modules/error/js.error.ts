/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 11:24:10
 * @LastEditTime: 2021-09-08 15:51:57
 * @LastEditors: vscode
 * @Description: JS 全局异常捕获 ，但是不能捕获 el.onError 和 资源加载失败
 */

import { clientReport } from '../../report';
import { ErrorLog } from '../../types/errorLog';

export class JsError {
    constructor() {
        this.init();
    }
    init() {
        /**
         * @description 运行时错误处理器
         * @param {string} message 错误信息
         * @param {string} source 发生错误的脚本URL
         * @param {number} lineno 发生错误的行号
         * @param {number} colno 发生错误的列号
         * @param {object} error Error对象
         */
        window.onerror = this.sendError as any;
    }

    sendError(
        event: Event | string,
        source: string = '',
        lineno: number = -1,
        colno: number = -1,
        error: Error
    ) {
        const params: ErrorLog = {
            msg: event instanceof Event ? event.toString() : event,
            source,
            lineno,
            colno,
            error: error?.message,
            level: 'error',
            category: 'js'
        };

        clientReport(params);
    }
}
