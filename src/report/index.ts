/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 10:53:10
 * @LastEditTime: 2021-08-31 19:30:03
 * @LastEditors: vscode
 * @Description:发送请求方法封装
 * 1. sendBeacon
 * 2. img
 * 3. xmlHttp
 */

import { baseUrl, GET_LEN, globalConf } from '../conf/global';
import { setCommonParams } from './common';

import imgSend from './img';
import navSendBeacon from './sendBeacon';
import xmlSend from './xmlHttp';

// 发送请求上报
export function clientReport(data: any) {
    setCommonParams(data);

    const api = baseUrl + '/' + globalConf.aId,
        params = JSON.stringify(data);

    return xmlSend(api, params);
    // 如果支持sendBeacon 就是用此方法上传日志
    if ((navigator as any).sendBeacon) return navSendBeacon(api, params);
    // 兼容各个平台，GET 请求参数不超过 GET_SIZE 字节的大小
    if (params.length < GET_LEN) return imgSend(api, params);
    return xmlSend(api, params);
}
