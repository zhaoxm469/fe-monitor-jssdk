import { baseUrl, globalConf } from '../conf/global';
import { errJsonEnum, ErrorInfo } from '../types';
import { imgSend } from './img';
import { navSendBeacon } from './sendBeacon';
import { xmlSend } from './xmlHttp';
const uuid = localStorage.getItem('fmr-uuid');

// 发送请求上报
export function clientReport(data: any) {
    data[errJsonEnum.pageLocation] = window.location.href;
    data[errJsonEnum.uuid] = uuid || '';

    const api = baseUrl + '/' + globalConf.aId,
        params = JSON.stringify(data);

    if ((navigator as any).sendBeacon) return navSendBeacon(api, params);
    if (params.length < 300) return imgSend(api, params);
    return xmlSend(api, params);
}
