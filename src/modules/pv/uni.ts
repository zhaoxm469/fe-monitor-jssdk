export default function (send: Function) {
    if (!uni) return;
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
            send();
        };
    }
}
