import { baseUrl, globalConf } from '../conf/global';
import { setCommonParams } from './common';

import imgSend from './img';
import navSendBeacon from './sendBeacon';
import xmlSend from './xmlHttp';

// 发送请求上报
export function clientReport(data: any) {
    setCommonParams(data);

    const api = baseUrl + '/' + globalConf.aId,
        params = JSON.stringify(data);

    if ((navigator as any).sendBeacon) return navSendBeacon(api, params);
    if (params.length < 300) return imgSend(api, params);
    return xmlSend(api, params);
}
