/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 23:18:04
 * @LastEditTime: 2021-08-25 17:47:45
 * @LastEditors: vscode
 * @Description:基类，请求统一发送
 */
import { clientReport } from '../../report';
import { errJsonEnum, ErrorInfo } from '../../types';

export class FeErrorReport {
    constructor() {}
    send(params: ErrorInfo) {
        params[errJsonEnum.level] = 'error';

        clientReport(params);
    }
}
