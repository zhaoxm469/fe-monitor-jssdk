/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 11:24:10
 * @LastEditTime: 2021-08-24 15:21:09
 * @LastEditors: vscode
 * @Description:
 * 		只捕获资源加载失败。
 * 		解决 window.onError 不能捕获的问题，
 * 		需要过滤无用的报错信息，避免和window.onError重复提交
 */

export function resourcesError() {
    window.addEventListener('error', error, true);
}

function error(ev: ErrorEvent | Event) {
    if (!(ev instanceof ErrorEvent)) {
        console.log('资源加载失败');
        console.log(ev);
    }
}
