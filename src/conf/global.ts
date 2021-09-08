import { iConf } from '../types';

export const globalConf: iConf = {
    aId: '',
    // 上报参数长度
    resLen: 1000,
    // 上报参数长度
    reqLen: 1000,
    // 是否上报ajax性能数据，错误等信息
    isAjax: true,
    // 是否上报JS报错
    isJsError: true,
    // 是否上报PV数据
    isPv: true,
    // 是否上报前端性能
    isPerformance: true,
    appType: 'h5'
};

export const GET_LEN = 2048;

// export const baseUrl =
//     process.env.NODE_ENV === 'development'
//         ? 'http://zzz:9987/reporter'
//         : 'http://znode.nucarf.cn/nestApi/reporter';

// export const baseUrl = 'http://znode.nucarf.cn/nestApi/reporter';
export const baseUrl = '/nestApi/reporter';
