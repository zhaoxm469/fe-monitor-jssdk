/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 10:53:10
 * @LastEditTime: 2021-09-10 09:49:10
 * @LastEditors: vscode
 * @Description: 日志上报
 */

import { BASE_URL, GET_LEN, globalConf } from '../conf/global';
import { IgnoreArrayType } from '../types';
import { CommonLog } from '../types/commonLog';
import { objectTypeName } from '../utils';
import { setCommonParams } from './common';

import imgSend from './img';
import navSendBeacon from './sendBeacon';
import xmlSend from './xmlHttp';

// 发送请求上报
export function clientReport(data: CommonLog) {
    data = setCommonParams(data);

    const params = JSON.stringify(data);

    // 忽略哪些数据上报
    if (isIgnore(params)) return;

    // 只采集 30% , 降低服务器压力
    // if (Math.random() < 0.3) return;

    // 当下几种类型数据传输较少，直接使用img方式进行请求发送
    if (
        (data.level === 'pv' || data.category === 'pageTime') &&
        params.length < GET_LEN
    ) {
        return imgSend(BASE_URL, data);
    }

    if (typeof navigator.sendBeacon === 'function') {
        return navSendBeacon(BASE_URL, params);
    }

    // 兼容各个平台，GET 请求参数不超过 GET_SIZE 字节的大小
    if (params.length < GET_LEN) return imgSend(BASE_URL, data);
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
