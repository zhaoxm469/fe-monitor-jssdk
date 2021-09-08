/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 10:53:10
 * @LastEditTime: 2021-09-08 20:56:17
 * @LastEditors: vscode
 * @Description:发送请求方法封装
 * 1. sendBeacon
 * 2. img
 * 3. xmlHttp
 */

import { BASE_URL, GET_LEN } from '../conf/global';
import { setCommonParams } from './common';

import imgSend from './img';
import navSendBeacon from './sendBeacon';
import xmlSend from './xmlHttp';

// 发送请求上报
export function clientReport(data: any) {
    data = setCommonParams(data);

    const params = JSON.stringify(data);

    // 只采集 30% , 降低服务器压力
    // if (Math.random() < 0.3) {
    // }

    // return xmlSend(BASE_URL, params);
    // 如果支持sendBeacon 就是用此方法上传日志
    if ((navigator as any).sendBeacon) return navSendBeacon(BASE_URL, params);
    // 兼容各个平台，GET 请求参数不超过 GET_SIZE 字节的大小
    if (params.length < GET_LEN) return imgSend(BASE_URL, params);
    return xmlSend(BASE_URL, params);
}
