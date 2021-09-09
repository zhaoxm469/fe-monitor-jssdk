/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 10:53:10
 * @LastEditTime: 2021-09-09 13:16:59
 * @LastEditors: vscode
 * @Description: 日志上报
 */

import { BASE_URL, GET_LEN, globalConf } from '../conf/global';
import { IgnoreArrayType } from '../types';
import { objectTypeName } from '../utils';
import { setCommonParams } from './common';

import imgSend from './img';
import navSendBeacon from './sendBeacon';
import xmlSend from './xmlHttp';

// 发送请求上报
export function clientReport(data: any) {
    data = setCommonParams(data);

    const params = JSON.stringify(data);

    if (isIgnore(params)) return;

    // 只采集 30% , 降低服务器压力
    // if (Math.random() < 0.3) {
    // }

    if (typeof navigator.sendBeacon === 'function') {
        return navSendBeacon(BASE_URL, params);
    }

    // return xmlSend(BASE_URL, params);
    // 如果支持sendBeacon 就是用此方法上传日志
    // 兼容各个平台，GET 请求参数不超过 GET_SIZE 字节的大小
    if (params.length < GET_LEN) return imgSend(BASE_URL, params);
    return xmlSend(BASE_URL, params);
}

// 是否忽略当前上报请求
function isIgnore(params: string): boolean {
    if (!globalConf.ignore) return false;

    if (
        typeof globalConf.ignore === 'string' &&
        params.includes(globalConf.ignore)
    ) {
        return true;
    }
    if (
        objectTypeName(globalConf.ignore) === 'regexp' &&
        (globalConf.ignore as RegExp).test(params)
    ) {
        return true;
    }

    if (objectTypeName(globalConf.ignore) === 'array') {
        for (let item of globalConf.ignore as IgnoreArrayType) {
            if (typeof item === 'string' && params.includes(item)) {
                return true;
            }
            if (
                objectTypeName(item) === 'regexp' &&
                (item as RegExp).test(params)
            ) {
                return true;
            }
        }
    }

    return false;
}
