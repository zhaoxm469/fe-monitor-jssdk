/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 14:46:39
 * @LastEditTime: 2021-08-30 09:52:48
 * @LastEditors: vscode
 * @Description:
 *
 */
import { lastEvent } from './getLastEvent';

export function guid() {
    return 'xxxx-xxxx-4xxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function isFunction(val: any) {
    return typeof val === 'function';
}

// 函数toString方法
export const fnToString = function (e: string) {
    return function () {
        return e + '() { [native code] }';
    };
};

/**
 * @description: 判断是否位数组
 */
export function isArray(value: any) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

/*
 * 获取事件冒泡路径，兼容ie11,edge,chrome,firefox,safari
 */
export function getSelector() {
    if (lastEvent && lastEvent.path) {
        const path = lastEvent.path
            .filter((item) => {
                const nodeName = (item as HTMLElement).nodeName;
                const re = /HTML|document|window/gi;
                if (!nodeName || re.test(nodeName)) return false;
                return true;
            })
            .reverse()
            .map((item) => {
                const { id, classList, nodeName } = item as HTMLElement;
                const newNodeName = nodeName.toLocaleLowerCase();
                if (id) return `#${id}`;

                if (classList.length)
                    return `.${[...(classList as any)].join('.')}`;
                return newNodeName;
            })
            .join('->');
        return path;
    }
    return '';
}
