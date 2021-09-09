/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 14:46:39
 * @LastEditTime: 2021-09-09 12:57:56
 * @LastEditors: vscode
 * @Description:
 *
 */
export function guid() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function isFunction(val: any) {
    return typeof val === 'function';
}

// 判断是否位数组
export function isArray(value: any) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

// 对象类型名称
export function objectTypeName(value: any) {
    return Object.prototype.toString
        .call(value)
        .substring(8)
        .replace(/]/, '')
        .toLocaleLowerCase();
}
