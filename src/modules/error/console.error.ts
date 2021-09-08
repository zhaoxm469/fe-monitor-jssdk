/*
 * @Author: zhaoxingming
 * @Date: 2021-08-25 17:38:11
 * @LastEditTime: 2021-09-08 15:55:01
 * @LastEditors: vscode
 * @Description: 篡改 console
 *
 */

import { clientReport } from '../../report';
import { ConsoleErrorLog } from '../../types/errorLog';

export class ConsoleError {
    private _oldConsoleError;
    constructor() {
        this._oldConsoleError = window.console.error;
        this.init();
    }
    init() {
        if (!window.console || !window.console.error) return;

        window.console.error = this.sendError.bind(this);
    }
    sendError() {
        const params: ConsoleErrorLog = {
            msg: JSON.stringify([...arguments].join(',')),
            level: 'error',
            category: 'console.error'
        };

        this._oldConsoleError &&
            this._oldConsoleError.apply(window, arguments as any);

        // 如果自定义的err，参数中包含no-send，不发送上报请求
        if ([...arguments].includes('no-send')) return;

        clientReport(params);
    }
}
