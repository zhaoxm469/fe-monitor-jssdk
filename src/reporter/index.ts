import { baseUrl, globalConf } from '../conf';
import { errJsonEnum, ErrorInfo, reporterTypeEnum } from '../types';
import { imgSend } from './img';
import { navSendBeacon } from './sendBeacon';
import { xmlSend } from './xmlHttp';

// 发送请求上报
export function reporter(data: Partial<ErrorInfo>) {
    data[errJsonEnum.aId] = globalConf.aId;

    const api = baseUrl,
        params = JSON.stringify(data);

    if ((navigator as any).sendBeacon) return navSendBeacon(api, params);
    if (params.length < 300) return imgSend(api, params);
    return xmlSend(api, params);
}
