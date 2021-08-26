/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 11:24:10
 * @LastEditTime: 2021-08-26 10:42:10
 * @LastEditors: vscode
 * @Description:捕获promise错误。
 */

import { errJsonEnum, ErrorInfo } from '../../types';
import { FeErrorReport } from './common';

export class PromiseError extends FeErrorReport {
    constructor() {
        super();
        this.init();
    }

    init() {
        window.addEventListener('unhandledrejection', this.sendError, true);
    }

    sendError(ev: PromiseRejectionEvent) {
        const params: ErrorInfo = {
            [errJsonEnum.category]: 'promise',
            [errJsonEnum.msg]:
                typeof ev.reason === 'object'
                    ? JSON.stringify(ev.reason)
                    : ev.reason
        };
        console.log(ev);
        super.send(params);
    }
}
