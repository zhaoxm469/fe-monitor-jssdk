/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 10:53:54
 * @LastEditTime: 2021-09-09 10:03:20
 * @LastEditors: vscode
 * @Description:xhr 简单封装 POST 方式进行日志上报
 */

export default function (api: string, params: string) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', api);
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.send(params);
}
