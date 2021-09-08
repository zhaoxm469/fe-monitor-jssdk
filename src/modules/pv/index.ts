/*
 * @Author: zhaoxingming
 * @Date: 2021-08-26 17:51:29
 * @LastEditTime: 2021-09-07 15:26:40
 * @LastEditors: vscode
 * @Description: 页面PV 数据自动上报
 */

import { clientReport } from '../../report';
import { CommonEnum, PvAliasEnum, PvInfoLog } from '../../types';
import uni from './uni';

export default class FePvLog {
    constructor() {
        this.send();
        this.addEventRoute();
    }
    send() {
        const params: PvInfoLog = {
            [PvAliasEnum.title]: document.title || '暂无标题',
            [PvAliasEnum.devicePixelRatio]: window.devicePixelRatio + '' || '',
            [PvAliasEnum.charset]: document.charset || '',
            [CommonEnum.level]: 'pv'
        };
        clientReport(params);
    }
    addEventRoute() {
        uni(this.send);
    }
}
