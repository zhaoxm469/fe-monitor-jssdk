/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 10:53:18
 * @LastEditTime: 2021-09-09 10:01:37
 * @LastEditors: vscode
 * @Description:img方式进行日志上报
 *
 * 可以进行跨域
 * 不会携带cookie
 * 不需要等待服务器返回数据
 *
 */

export default function (api: string, params: string) {
    const oImg = new Image();
    oImg.src = api + '?c=' + params;
}
