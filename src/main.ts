import FePerformance from './modules/performance';
import FeErrorMonitor from './modules/error';
import { globalConf } from './conf/global';
import FeApiMonitor from './modules/api';
import FePv from './modules/pv';
import { iConf } from './types';
import { guid } from './utils';

class Fmr {
    constructor(opts: iConf) {
        this.setConf(opts);
        this.init();
    }

    init(): void {
        if (globalConf.isPerformance) new FePerformance();
        if (globalConf.isJsError) new FeErrorMonitor();
        if (globalConf.isAjax) new FeApiMonitor();
        if (globalConf.isPv) new FePv();
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
}

export default Fmr;
