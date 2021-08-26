/*
 * @Author: zhaoxingming
 * @Date: 2021-08-26 11:10:51
 * @LastEditTime: 2021-08-26 11:40:16
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
        console.log(vue);
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
        // if (Object.prototype.toString.call(vm) === '[object Object]') {
        //     // console.log(error.message);
        //     // console.log(error.stack.toString());
        //     // console.table(error);
        // }
        super.send(params);

        if (
            this.orderVueErrorHandler &&
            isFunction(this.orderVueErrorHandler)
        ) {
            this.orderVueErrorHandler.call(this, error, vm, info);
        }
    }
}
