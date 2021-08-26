/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 11:24:10
 * @LastEditTime: 2021-08-25 17:26:10
 * @LastEditors: vscode
 * @Description:
 * 		只捕获资源加载失败。
 * 		解决 window.onError 不能捕获的问题，
 * 		需要过滤无用的报错信息，避免和window.onError重复提交
 */

import { errJsonEnum, ErrorInfo } from '../../types';
import { FeErrorReport } from './common';

export class ResourcesError extends FeErrorReport {
    constructor() {
        super();
        this.init();
    }
    init() {
        window.addEventListener('error', this.sendError, true);
    }
    sendError(ev: ErrorEvent | Event) {
        if (!(ev instanceof ErrorEvent)) {
            const target = ev.target as HTMLElement,
                targetName = target.tagName.toLocaleLowerCase();

            let src = target.getAttribute('src') || target.getAttribute('href');

            const params: ErrorInfo = {
                [errJsonEnum.category]: 'resource',
                [errJsonEnum.url]: src ? src : '',
                [errJsonEnum.targetName]: targetName
            };

            super.send(params);
        }
    }
}
