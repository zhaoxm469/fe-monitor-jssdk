import { CommonEnum } from '../types';
import { getSelector } from '../utils';

/**
 * @description: 公共参数设置
 */
export function setCommonParams(data: any) {
    const { innerWidth, innerHeight } = window;
    const uuid = localStorage.getItem('fmr-uuid');
    data[CommonEnum.pageLocation] = window.location.href;
    data[CommonEnum.uuid] = uuid || '';
    data[CommonEnum.pageWh] = `${innerWidth} * ${innerHeight}`;
    data[CommonEnum.selector] = getSelector();
    data[CommonEnum.viewPoint] = '123';

    return data;
}
