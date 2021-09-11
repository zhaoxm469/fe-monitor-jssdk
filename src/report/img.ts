/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 10:53:18
 * @LastEditTime: 2021-09-10 10:39:23
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
    const oImg = new Image();
    oImg.src =
        api + '/1.gif?params=' + encodeURIComponent(JSON.stringify(data));
}
