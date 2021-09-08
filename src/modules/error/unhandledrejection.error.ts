/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 11:24:10
 * @LastEditTime: 2021-09-08 16:16:04
 * @LastEditors: vscode
 * @Description:捕获异步错误。
 */

import { clientReport } from '../../report';
import { unhandledrejectionErrorLog } from '../../types/errorLog';

export class unhandledrejectionError {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('unhandledrejection', this.sendError, true);
    }

    sendError(ev: PromiseRejectionEvent) {
        const params: unhandledrejectionErrorLog = {
            msg:
                typeof ev.reason === 'object'
                    ? JSON.stringify(ev.reason)
                    : ev.reason,
            level: 'error',
            category: 'unhandledrejection'
        };

        clientReport(params);
    }
}
