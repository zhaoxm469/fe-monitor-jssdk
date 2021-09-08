/*
 * @Author: zhaoxingming
 * @Date: 2021-08-26 11:10:51
 * @LastEditTime: 2021-09-07 11:29:04
 * @LastEditors: vscode
 * @Description:vue 错误上报
 */

import { globalConf } from '../../conf/global';
import { errJsonEnum, ErrorInfo } from '../../types';
import { isFunction } from '../../utils';
import { FeErrorReport } from './common';

export class VueError extends FeErrorReport {
    orderVueErrorHandler: any;

    constructor() {
        super();
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

        const params: ErrorInfo = {
            [errJsonEnum.lineno]: Number(lineno),
            [errJsonEnum.colno]: Number(colno),
            [errJsonEnum.error]: errorList.join(','),
            [errJsonEnum.category]: 'vue',
            [errJsonEnum.msg]: errMsg
        };

        if (Object.prototype.toString.call(vm) === '[object Object]') {
            console.error(error, 'no-send');
            super.send(params);
        }

        if (
            this.orderVueErrorHandler &&
            isFunction(this.orderVueErrorHandler)
        ) {
            this.orderVueErrorHandler.call(this, error, vm, info);
        }
    }
}
