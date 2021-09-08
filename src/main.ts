import FePerformanceLog from './modules/performance';
import { globalConf } from './conf/global';
import FeErrorLog from './modules/error';
import FeApiLog from './modules/api';
import FePvLog from './modules/pv';
import { iConf } from './types';
import { guid } from './utils';

class Zer {
    constructor(opts: iConf) {
        this.setConf(opts);
        this.init();
    }

    init(): void {
        if (globalConf.isPerformance) new FePerformanceLog();
        if (globalConf.isJsError) new FeErrorLog();
        if (globalConf.isAjax) new FeApiLog();
        if (globalConf.isPv) new FePvLog();
    }

    // 参数合并
    setConf(opts: iConf) {
        if (!opts.aId) throw '缺少aId参数！';
        Object.assign(globalConf, opts);
        this.setUuid();
    }

    // 自定义设置UUid
    setUuid() {
        localStorage.setItem('fmr-uuid', guid());
    }

    testPv() {
        new FePvLog();
    }
}

export default function (opts: iConf) {
    const zer = new Zer(opts);
    globalThis['zer'] = zer;
    return zer;
}
