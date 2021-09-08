export default class Uni {
    constructor(private send: Function) {
        if (!window.uni) return;
        this.init();
    }
    init() {
        const funs = [
            'navigateTo',
            'redirectTo',
            'switchTab',
            'reLaunch',
            'navigateBack'
        ];
        for (let keyName of funs) {
            const oldFun = uni[keyName];
            uni[keyName] = function (...arg: any) {
                console.log(`${keyName},${arg[0].url}`);
                oldFun.apply(oldFun, arg);
                this.send();
            };
        }
    }
}
