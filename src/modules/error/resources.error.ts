/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 11:24:10
 * @LastEditTime: 2021-09-08 15:58:38
 * @LastEditors: vscode
 * @Description:
 * 		只捕获资源加载失败。
 * 		解决 window.onError 不能捕获的问题，
 * 		需要过滤无用的报错信息，避免和window.onError重复提交
 */

import { clientReport } from '../../report';
import { ResourcesErrorLog } from '../../types/errorLog';

export class ResourcesError {
    constructor() {
        this.init();
    }
    init() {
        window.addEventListener('error', this.sendError, true);
    }
    sendError(ev: ErrorEvent | Event) {
        if (!(ev instanceof ErrorEvent)) {
            const target = ev.target as HTMLElement,
                targetName = target.tagName.toLocaleLowerCase();

            const src =
                target.getAttribute('src') || target.getAttribute('href');

            const params: ResourcesErrorLog = {
                errorUrl: src ? src : '',
                targetName,
                level: 'error',
                category: 'resource'
            };

            clientReport(params);
        }
    }
}
