export default class UniRouterMethods {
    constructor(private send: Function) {
        try {
            if (!uni) return;
            this.init();
        } catch (err) {
            // δΈεε€η
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
