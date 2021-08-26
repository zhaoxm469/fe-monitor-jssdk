/*
 * @Author: zhaoxingming
 * @Date: 2021-08-25 17:38:11
 * @LastEditTime: 2021-08-26 16:57:50
 * @LastEditors: vscode
 * @Description: 篡改 console
 *
 */
import { errJsonEnum, ErrorInfo } from '../../types';
import { FeErrorReport } from './common';

export class ConsoleError extends FeErrorReport {
    private _oldConsoleError;
    constructor() {
        super();
        this._oldConsoleError = window.console.error;
        this.init();
    }
    init() {
        if (!window.console || !window.console.error) return;

        window.console.error = this.sendError.bind(this);
    }
    sendError() {
        const params: ErrorInfo = {
            [errJsonEnum.msg]: JSON.stringify([...arguments].join(',')),
            [errJsonEnum.category]: 'console.error'
        };
        this._oldConsoleError &&
            this._oldConsoleError.apply(window, arguments as any);

        // 如果自定义的err，参数中包含no-send，不发送上报请求
        if ([...arguments].includes('no-send')) return;
        super.send(params);
    }
}
