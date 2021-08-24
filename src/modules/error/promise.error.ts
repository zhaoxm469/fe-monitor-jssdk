/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 11:24:10
 * @LastEditTime: 2021-08-24 14:33:11
 * @LastEditors: vscode
 * @Description:捕获promise错误。
 */

export function promiseError() {
    window.addEventListener('unhandledrejection', error);
}

function error(ev: PromiseRejectionEvent) {
    console.log(ev);
}
