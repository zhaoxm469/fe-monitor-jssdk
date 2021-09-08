import { CommonLog } from '../types/commonLog';
import { getEventInfo, lastEvent } from '../utils/getLastEvent';

/**
 * @description: 公共参数设置
 */
export function setCommonParams(data: any) {
    const { innerWidth, innerHeight } = window;
    const uuid = localStorage.getItem('fmr-uuid');

    const referrer =
        document.referrer && document.referrer !== location.href
            ? document.referrer
            : '';

    const { clientX, readXPath, clientY } = getEventInfo();

    const commonParams: Required<CommonLog> = {
        pageLocation: window.location.href,
        uid: uuid || '',

        // 各个时间发送器自己定义
        level: '',
        // 各个时间发送器自己定义
        category: '',
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
