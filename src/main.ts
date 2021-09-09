import FePerformanceLog from './modules/performance';
import { globalConf, VERSION } from './conf/global';
import FeErrorLog from './modules/error';
import FeApiLog from './modules/api';
import FePvLog from './modules/pv';
import { iConf } from './types';
import { guid } from './utils';
class Zer {
    static instance: Zer;
    version = VERSION;

    constructor() {
        this.init();
    }

    init(): void {
        this.setUuid();
        if (globalConf.isPerformance) new FePerformanceLog();
        if (globalConf.isJsError) new FeErrorLog();
        if (globalConf.isAjax) new FeApiLog();
        if (globalConf.isPv) new FePvLog();
    }

    // 设置uuid
    setUuid() {
        const uuid = localStorage.getItem('zer-uuid');
        !uuid && localStorage.setItem('zer-uuid', guid());
    }
}

export default function (opts: iConf) {
    if (!opts.aId) throw '缺少aId参数！';
    if (!Zer.instance) {
        Object.assign(globalConf, opts);
        Zer.instance = new Zer();
    }
    return Zer.instance;
}
