/*
 * @Author: zhaoxingming
 * @Date: 2021-09-08 19:34:48
 * @LastEditTime: 2021-09-08 19:43:46
 * @LastEditors: vscode
 * @Description:监听浏览器的返回前进按键
 */

export default class FeOnpopatate {
    constructor(private send: Function) {
        this.init();
    }
    init() {
        const that = this;
        window.onpopstate = function () {
            that.send();
        };
    }
}
