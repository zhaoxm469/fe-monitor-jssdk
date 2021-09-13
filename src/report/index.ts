/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 10:53:10
 * @LastEditTime: 2021-09-13 15:00:19
 * @LastEditors: vscode
 * @Description: 日志上报
 */

import { BASE_URL, globalConf } from '../conf/global';
import { IgnoreArrayType } from '../types';
import { CommonLog } from '../types/commonLog';
import { objectTypeName } from '../utils';
import { setCommonParams } from './common';

import navSendBeacon from './sendBeacon';
import xmlSend from './xmlHttp';
import imgSend from './img';

const { getMaxLen, ignore, collectionRate } = globalConf;

// 发送请求上报
export function clientReport(data: CommonLog) {
    data = setCommonParams(data);

    const params = JSON.stringify(data);

    // 忽略哪些数据上报
    if (isIgnore(params)) return;

    // 设置采集率，降低服务器压力
    if (collectionRate > Math.random() * 100) return;

    if (isUseImg(data)) return imgSend(BASE_URL, data);

    if (typeof navigator.sendBeacon === 'function') {
        return navSendBeacon(BASE_URL, params);
    }

    // GET 请求参数不超过 getMaxLen
    if (params.length < getMaxLen) return imgSend(BASE_URL, data);

    return xmlSend(BASE_URL, params);
}

// 是否使用img方式进行上报
function isUseImg(data: CommonLog) {
    // 当下几种类型数据传输较少，直接使用img方式进行请求发送
    const isUseType =
        data.level === 'pv' ||
        data.category === 'pageTime' ||
        data.category === 'resource';

    return isUseType && JSON.stringify(data).length < getMaxLen;
}

// 是否忽略当前上报请求
function isIgnore(params: string): boolean {
    if (!ignore) return false;

    if (typeof ignore === 'string' && params.includes(ignore)) {
        return true;
    }
    if (
        objectTypeName(ignore) === 'regexp' &&
        (ignore as RegExp).test(params)
    ) {
        return true;
    }

    if (objectTypeName(ignore) === 'array') {
        for (let item of ignore as IgnoreArrayType) {
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
