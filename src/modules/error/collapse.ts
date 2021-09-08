/*
 * @Author: zhaoxingming
 * @Date: 2021-09-08 20:41:47
 * @LastEditTime: 2021-09-08 20:55:11
 * @LastEditors: vscode
 * @Description:监听网页崩溃和卡顿
 *	http://jartto.wang/2018/11/20/js-exception-handling/index.html
 */

import { clientReport } from '../../report';
import { CollapseErrorLog } from '../../types/errorLog';

export default class FeCollapse {
    constructor() {
        this.init();
    }
    init() {
        window.addEventListener('load', function () {
            sessionStorage.setItem('good_exit', 'pending');
            setInterval(function () {
                sessionStorage.setItem(
                    'time_before_crash',
                    new Date().toString()
                );
                console.log('time_before_crash');
            }, 1000);
        });

        window.addEventListener('beforeunload', function () {
            sessionStorage.setItem('good_exit', 'true');
        });

        if (
            sessionStorage.getItem('good_exit') &&
            sessionStorage.getItem('good_exit') !== 'true'
        ) {
            const params: CollapseErrorLog = {
                time_before_crash: sessionStorage.getItem(
                    'time_before_crash'
                ) as string,
                msg: '页面崩溃了',
                source: '',
                lineno: 0,
                colno: 0,
                stack: undefined,
                level: 'error',
                category: 'collapse'
            };

            clientReport(params);
        }
    }
}
