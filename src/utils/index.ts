/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 14:46:39
 * @LastEditTime: 2021-09-08 19:53:41
 * @LastEditors: vscode
 * @Description:
 *
 */
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
