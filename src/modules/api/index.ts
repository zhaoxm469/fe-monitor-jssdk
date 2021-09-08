/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 14:59:12
 * @LastEditTime: 2021-09-08 16:48:56
 * @LastEditors: vscode
 * @Description: api 接口信息上报
 */

import { lastEvent } from '../../utils/getLastEvent';
import { clientReport } from '../../report';
import { ApiLog } from '../../types/apiLog';
import { getSelector } from '../../utils';
import AnyXHR from './any-xhr';
import { globalConf } from '../../conf/global';

export default class FeApiLog {
    constructor() {
        this.init();
    }
    init() {
        this.hackXhr();
    }
    hackXhr() {
        const xhr = new AnyXHR();

        xhr.add('open', function (res: any) {
            // @ts-ignore
            const that: any = this;
            const [methods, apiUrl] = res;
            let reportParams: ApiLog = {
                category: 'xhr',
                level: 'api',
                httpStatusCode: '',
                sendBeginTime: +new Date(),
                apiUrl,
                httpSuccess: false,
                totalTime: '',
                resText: '',
                reqText: '',
                methods,
                handleType: lastEvent?.type || '',
                selector: getSelector()
            };
            that.reportParams = reportParams;
        });

        xhr.add('send', function (res: any) {
            // @ts-ignore
            const that: any = this;
            that.reportParams.reqText = res[0].substring(0, globalConf.reqLen);
        });

        xhr.add('onload', function () {
            // @ts-ignore
            const that: any = this;
            paramsMerge(that);
        });
        xhr.add('onerror', function () {
            // @ts-ignore
            const that: any = this;
            paramsMerge(that);
        });

        function paramsMerge(that: any) {
            const totalTime = Date.now() - that.reportParams.sendBeginTime;

            that.reportParams.httpStatusCode = that.status;
            that.reportParams.httpSuccess =
                that.status >= 200 && that.status < 300;
            that.reportParams.resText = that.responseText.substring(
                0,
                globalConf.resLen
            );
            that.reportParams.totalTime = totalTime + '';

            clientReport(that.reportParams);
        }
    }
}
