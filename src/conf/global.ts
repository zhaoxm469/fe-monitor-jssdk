import { iConf } from '../types';

export const globalConf: iConf = {
    aId: '',
    // 字符串长度
    parameterLen: 1000,
    // 是否上报ajax性能数据，错误等信息
    isAjax: true,
    // 是否上报JS报错
    isJsError: true,
    // 是否上报PV数据
    isPv: true,
    // 是否上报前端性能
    isPerformance: true
};

export const baseUrl = 'http://localhost:9987/reporter';
// export const baseUrl = 'http://znode.nucarf.cn/nestApi/reporter';
