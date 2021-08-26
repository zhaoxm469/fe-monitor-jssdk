import { globalConf } from './conf/global';
import { FeApiMonitor } from './modules/api';
import { FeErrorMonitor } from './modules/error';
import { iConf } from './types';
import { guid } from './utils';

class Fmr {
    constructor(opts: iConf) {
        this.setConf(opts);
        this.setUuid();

        this.init();
    }

    init(): void {
        if (globalConf.isJsError) new FeErrorMonitor();
        if (globalConf.isAjax) new FeApiMonitor();
    }

    setConf(opts: iConf) {
        if (!opts.aId) throw '缺少aId参数！';
        Object.assign(globalConf, opts);
    }

    setUuid() {
        localStorage.setItem('fmr-uuid', guid());
    }
}

export default Fmr;
