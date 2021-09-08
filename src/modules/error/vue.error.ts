/*
 * @Author: zhaoxingming
 * @Date: 2021-08-26 11:10:51
 * @LastEditTime: 2021-09-08 18:11:14
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
            new globalConf.appType()._isVue
        ) {
            vue = globalConf.appType;
        }

        if (!vue || !vue.config) return; // 没有找到vue实例
        this.orderVueErrorHandler = vue.config.errorHandler;
        vue.config.errorHandler = this.errorSend.bind(this);
    }

    errorSend(error: any, vm: any, info: any) {
        try {
            const errMsg = error?.message,
                stack = error.stack;

            console.log(error.stack);

            const errorList = stack
                .substring(0, stack.indexOf(')'))
                .replace(/(http|https)\:\/\//g, '')
                .split('\n');

            const [lineno, colno] = errorList[1]
                .trimStart()
                .split(':')
                .slice(-2);

            const params: VueErrorLog = {
                msg: errMsg,
                source: '',
                componentName: this.formatComponentName(vm),
                lineno: Number(lineno),
                colno: Number(colno),
                stack: stack,
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
        } catch (error) {
            // 无需出错处理
        }
    }
    formatComponentName(vm: any) {
        try {
            if (vm.$root === vm) return 'root';

            var name = vm._isVue
                ? (vm.$options && vm.$options.name) ||
                  (vm.$options && vm.$options._componentTag)
                : vm.name;
            return (
                (name ? 'component <' + name + '>' : 'anonymous component') +
                (vm._isVue && vm.$options && vm.$options.__file
                    ? ' at ' + (vm.$options && vm.$options.__file)
                    : '')
            );
        } catch (error) {
            // 无需出错处理
        }
    }
}
