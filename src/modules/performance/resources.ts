/*
 * @Author: zhaoxingming
 * @Date: 2021-09-08 21:39:08
 * @LastEditTime: 2021-09-08 22:00:12
 * @LastEditors: vscode
 * @Description:资源加载性能上报，这里只统计大于1秒中加载完成的资源
 */

import { clientReport } from '../../report';
import { ResourcesPerformanceLog } from '../../types/performance';

const maxDuration = 1000;

export default class ResourcesTime {
    constructor() {
        this.init();
    }
    init() {
        // 页面关闭的时候发送请求
        window.addEventListener('beforeunload', () => {
            const resources = window.performance
                .getEntriesByType('resource')
                .filter((item) => item.duration > maxDuration);
            const params: ResourcesPerformanceLog = {
                list: resources,
                level: 'performance',
                category: 'resource'
            };
            clientReport(params);
        });
    }
}
