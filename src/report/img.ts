/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 10:53:18
 * @LastEditTime: 2021-09-10 09:42:35
 * @LastEditors: vscode
 * @Description:img方式进行日志上报
 *
 * 可以进行跨域
 * 不会携带cookie
 * 不需要等待服务器返回数据
 *
 */

import { CommonLog } from '../types/commonLog';

export default function (api: string, data: CommonLog) {
    // 如果是这几种类型的日志上报 ， 无需传递以下字段给服务端
    if (data.level === 'pv' || data.level === 'performance') {
        delete data.clientX;
        delete data.clientY;
        delete data.selector;
        delete data.handleType;
        delete data.referrer;
    }
    const oImg = new Image();
    oImg.src = api + '/1.gif?params=' + JSON.stringify(data);
}
