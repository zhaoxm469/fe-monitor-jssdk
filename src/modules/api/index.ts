/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 14:59:12
 * @LastEditTime: 2021-09-08 15:34:32
 * @LastEditors: vscode
 * @Description: 监听api接口性能
 */

import { clientReport } from '../../report';
import { ApiLog } from '../../types/apiLog';
import AnyXHR from './any-xhr';

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
                category: '',
                level: 'api',
                httpStatusCode: '',
                sendBeginTime: +new Date(),
                apiUrl,
                httpSuccess: false,
                totalTime: '',
                resText: '',
                reqText: '',
                methods
            };
            that.reportParams = reportParams;
        });

        xhr.add('send', function (res: any) {
            // @ts-ignore
            const that: any = this;
            that.reportParams.reqText = res[0];
        });

        xhr.add('onload', function () {
            // @ts-ignore
            const that: any = this;
            const totalTime = Date.now() - that.reportParams.sendBeginTime;

            that.reportParams.httpStatusCode = that.status;
            that.reportParams.httpSuccess =
                that.status >= 200 && that.status < 300;
            that.reportParams.resText = that.responseText;
            that.reportParams.totalTime = totalTime + '';
            that.reportParams.apiUrl = that.responseURL;

            clientReport(that.reportParams);
        });
    }
}
