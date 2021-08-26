/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 11:24:10
 * @LastEditTime: 2021-08-25 18:28:58
 * @LastEditors: vscode
 * @Description: JS 全局异常捕获 ，但是不能捕获 el.onError 和 资源加载失败
 */

import { errJsonEnum, ErrorInfo } from '../../types';
import { FeErrorReport } from './common';

export class JsError extends FeErrorReport {
    constructor() {
        super();
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
        window.onerror = this.sendError;
    }

    sendError(
        event: Event | string,
        source?: string,
        lineno?: number,
        colno?: number,
        error?: Error
    ) {
        const params: ErrorInfo = {
            [errJsonEnum.msg]:
                event instanceof Event ? event.toString() : event,
            [errJsonEnum.source]: source,
            [errJsonEnum.lineno]: lineno,
            [errJsonEnum.colno]: colno,
            [errJsonEnum.error]: error?.message,
            [errJsonEnum.category]: 'js'
        };

        super.send(params);
    }
}
