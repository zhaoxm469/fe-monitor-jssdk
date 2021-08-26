/*
 * @Author: zhaoxingming
 * @Date: 2021-08-26 11:10:51
 * @LastEditTime: 2021-08-26 16:59:26
 * @LastEditors: vscode
 * @Description:vue 错误上报
 */

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
        const vue = (window as any).Vue;
        if (!vue || !vue.config) return; // 没有找到vue实例
        this.orderVueErrorHandler = vue.config.errorHandler;
        vue.config.errorHandler = this.errorSend.bind(this);
    }

    errorSend(error: any, vm: any, info: any) {
        const params: ErrorInfo = {
            [errJsonEnum.msg]: error?.message + '. info -> ' + info,
            [errJsonEnum.error]: error?.stack,
            [errJsonEnum.category]: 'vue'
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
