/*
 * @Author: zhaoxingming
 * @Date: 2021-08-26 17:51:29
 * @LastEditTime: 2021-09-01 14:32:43
 * @LastEditors: vscode
 * @Description: 页面PV 数据自动上报
 */

import { clientReport } from '../../report';
import { CommonEnum, PvAliasEnum, PvInfoLog } from '../../types';

export default class FePvLog {
    constructor() {
        this.init();
    }
    init() {
        const params: PvInfoLog = {
            [PvAliasEnum.title]: document.title || '暂无标题',
            [PvAliasEnum.referrer]: document.referrer,
            [PvAliasEnum.devicePixelRatio]: window.devicePixelRatio + '' || '',
            [PvAliasEnum.charset]: document.charset || '',
            [CommonEnum.level]: 'pv'
        };
        clientReport(params);
    }
}
