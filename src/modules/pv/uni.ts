export default class Uni {
    constructor(private send: Function) {
        try {
            if (!uni) return;
            this.init();
        } catch (err) {
            // 不做处理
        }
    }
    init() {
        const funs = [
            'navigateTo',
            'redirectTo',
            'switchTab',
            'reLaunch',
            'navigateBack'
        ];
        const that = this;
        for (let keyName of funs) {
            const oldFun = uni[keyName];
            uni[keyName] = function (...arg: any) {
                oldFun.apply(oldFun, arg);
                that.send();
            };
        }
    }
}
