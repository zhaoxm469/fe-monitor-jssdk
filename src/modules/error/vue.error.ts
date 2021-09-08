/*
 * @Author: zhaoxingming
 * @Date: 2021-08-26 11:10:51
 * @LastEditTime: 2021-09-08 16:01:17
 * @LastEditors: vscode
 * @Description:vue 错误上报
 */

import { globalConf } from '../../conf/global';
import { clientReport } from '../../report';
import { VueErrorLog } from '../../types/errorLog';
import { isFunction } from '../../utils';

export class VueError {
    orderVueErrorHandler: any;

    constructor() {
        this.init();
    }
    init() {
        let vue = (window as any).Vue;
        if (
            typeof globalConf.appType === 'function' &&
            globalConf.appType.name === 'Vue'
        ) {
            vue = globalConf.appType;
        }

        if (!vue || !vue.config) return; // 没有找到vue实例
        this.orderVueErrorHandler = vue.config.errorHandler;
        vue.config.errorHandler = this.errorSend.bind(this);
    }

    errorSend(error: any, vm: any, info: any) {
        const errMsg = error?.message,
            stack = error.stack;

        const errorList = stack
            .substring(0, stack.indexOf(')'))
            .replace(/(http|https)\:\/\//g, '')
            .split('\n');

        const [lineno, colno] = errorList[1].trimStart().split(':').slice(-2);

        const params: VueErrorLog = {
            msg: errMsg,
            source: '',
            lineno: Number(lineno),
            colno: Number(colno),
            error: errorList.join(','),
            level: 'error',
            category: 'vue'
        };

        if (Object.prototype.toString.call(vm) === '[object Object]') {
            console.error(error, 'no-send');
            clientReport(params);
        }

        if (
            this.orderVueErrorHandler &&
            isFunction(this.orderVueErrorHandler)
        ) {
            this.orderVueErrorHandler.call(this, error, vm, info);
        }
    }
}
