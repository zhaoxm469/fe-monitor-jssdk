import { iConf } from '../types';

export const BASE_URL = 'http://znode.nucarf.cn/nestApi/reporter/1.gif';
export const GET_LEN = 2048;

export const globalConf: iConf = {
    aId: '',
    resLen: 1024 * 10,
    reqLen: 1024 * 10,
    isAjax: true,
    isJsError: true,
    isPv: true,
    isPerformance: true,
    appType: 'h5',
    appVersion: '',
    uId: '',
    ignore: ''
};

// export const baseUrl =
//     process.env.NODE_ENV === 'development'
//         ? 'http://zzz:9987/reporter'
//         : 'http://znode.nucarf.cn/nestApi/reporter';
