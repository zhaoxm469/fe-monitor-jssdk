/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 14:59:12
 * @LastEditTime: 2021-09-09 15:15:42
 * @LastEditors: vscode
 * @Description: api 接口信息上报
 */

import { getEventInfo, lastEvent } from '../../utils/getLastEvent';
import { clientReport } from '../../report';
import { ApiLog } from '../../types/apiLog';
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
            const { clientX, readXPath, clientY, handleType } = getEventInfo();
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
                clientX,
                clientY,
                handleType,
                selector: readXPath
            };
            that.reportParams = reportParams;
        });

        xhr.add('send', function (res: any) {
            // @ts-ignore
            const that: any = this;
            try {
                that.reportParams.reqText = res[0].substring(
                    0,
                    globalConf.reqLen
                );
            } catch (err) {
                that.reportParams.reqText = '';
            }
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
            try {
                that.reportParams.resText = that.responseText.substring(
                    0,
                    globalConf.resLen
                );
            } catch (err) {
                that.reportParams.resText = '';
            }

            that.reportParams.totalTime = totalTime + '';

            clientReport(that.reportParams);
        }
    }
}
