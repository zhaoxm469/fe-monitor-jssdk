/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 10:53:39
 * @LastEditTime: 2021-09-09 10:02:19
 * @LastEditors: vscode
 * @Description:
 *
 * 这个方法主要用于满足统计和诊断代码的需要，这些代码通常尝试在卸载（unload）文档之前向web服务器发送数据
 * 优先使用这种方式进行上报
 *
 */

export default function (api: string, params: string) {
    (navigator as any).sendBeacon(api, params);
}
