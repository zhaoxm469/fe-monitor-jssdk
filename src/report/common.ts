import { globalConf } from '../conf/global';
import { CommonLog } from '../types/commonLog';
import { getEventInfo, lastEvent } from '../utils/getLastEvent';

/**
 * @description: 公共参数设置
 */
export function setCommonParams(data: any) {
    const { innerWidth, innerHeight } = window;
    const uuid = localStorage.getItem('zer-uuid');

    const referrer =
        document.referrer && document.referrer !== location.href
            ? document.referrer
            : '';

    const { clientX, readXPath, clientY, handleType } = getEventInfo();
    const navigator: any = window.navigator;

    const commonParams: Required<CommonLog> = {
        aId: globalConf.aId,
        uId: globalConf.uId,
        appVersion: globalConf.appVersion,
        pageLocation: window.location.href,
        uuid: uuid || '',
        level: '',
        createTime: String(+new Date()),
        category: '',
        ua: navigator?.userAgent,
        effectiveType: navigator?.connection?.effectiveType,
        clientX,
        clientY,
        devicePixelRatio: window.devicePixelRatio || -0,
        pageWh: `${innerWidth} * ${innerHeight}`,
        handleType,
        selector: readXPath,
        referrer
    };

    return ignoreKeys(Object.assign(commonParams, data));
}

function ignoreKeys(params: CommonLog) {
    // 如果是这几种类型的日志上报 ， 无需传递以下字段给服务端
    if (params.level === 'pv' || params.category === 'pageTime') {
        delete params.clientX;
        delete params.clientY;
        delete params.selector;
        delete params.handleType;
        delete params.referrer;
    }

    if (params.level === 'performance' && params.category === 'resource') {
        delete params.clientX;
        delete params.clientY;
        delete params.selector;
        delete params.handleType;
    }

    return params;
}
