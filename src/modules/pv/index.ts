/*
 * @Author: zhaoxingming
 * @Date: 2021-08-26 17:51:29
 * @LastEditTime: 2021-09-08 16:11:08
 * @LastEditors: vscode
 * @Description: 页面PV 数据自动上报
 */

import { clientReport } from '../../report';
import { PvLog } from '../../types/pvLog';
import uni from './uni';

export default class FePvLog {
    constructor() {
        this.send();
        this.addEventRoute();
    }
    send() {
        const params: PvLog = {
            title: document.title,
            level: 'pv',
            category: ''
        };
        clientReport(params);
    }
    addEventRoute() {
        new uni(this.send);
    }
}
