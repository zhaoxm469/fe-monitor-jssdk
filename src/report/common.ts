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

    const { clientX, readXPath, clientY } = getEventInfo();
    const navigator: any = window.navigator;

    const commonParams: Required<CommonLog> = {
        aId: globalConf.aId,
        uId: globalConf.uId,
        appVersion: '',
        pageLocation: window.location.href,
        uuid: uuid || '',
        level: '',
        category: '',
        ua: navigator?.userAgent,
        effectiveType: navigator?.connection?.effectiveType,
        clientX,
        clientY,
        devicePixelRatio: window.devicePixelRatio || -0,
        pageWh: `${innerWidth} * ${innerHeight}`,
        handleType: lastEvent?.type || '',
        selector: readXPath,
        referrer
    };

    return Object.assign(commonParams, data);
}
