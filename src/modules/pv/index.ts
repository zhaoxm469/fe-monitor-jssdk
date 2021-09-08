/*
 * @Author: zhaoxingming
 * @Date: 2021-08-26 17:51:29
 * @LastEditTime: 2021-09-08 19:41:51
 * @LastEditors: vscode
 * @Description: 页面PV 数据自动上报
 */

import { clientReport } from '../../report';
import { PvLog } from '../../types/pvLog';
import FeOnpopatate from './onpopatate';
import UniRouterMethods from './uni';

export default class FePvLog {
    constructor() {
        this.init();
    }
    init() {
        this.send();
        new UniRouterMethods(this.send);
        new FeOnpopatate(this.send);
    }
    send() {
        const params: PvLog = {
            title: document.title,
            level: 'pv',
            category: ''
        };
        clientReport(params);
    }
}
