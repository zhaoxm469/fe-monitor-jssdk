import { CommonEnum } from '../types';
import { getSelector } from '../utils';
import { lastEvent } from '../utils/getLastEvent';

/**
 * @description: 公共参数设置
 */
export function setCommonParams(data: any) {
    const { innerWidth, innerHeight } = window;
    const uuid = localStorage.getItem('fmr-uuid');
    data[CommonEnum.pageLocation] = window.location.href;
    data[CommonEnum.uuid] = uuid || '';
    data[CommonEnum.pageWh] = `${innerWidth} * ${innerHeight}`;
    data[CommonEnum.viewPoint] = '123';
    data[CommonEnum.handleType] = lastEvent?.type || '';

    if (!data[CommonEnum.selector]) data[CommonEnum.selector] = getSelector();

    return data;
}
