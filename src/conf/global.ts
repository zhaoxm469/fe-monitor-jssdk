import { iConf } from '../types';

const PRO = '//znode.nucarf.cn/nestApi/report';
const DEV = '//localhost:9987/report';
const NODE_ENV = process.env.NODE_ENV;

export const BASE_URL = NODE_ENV === 'development' ? DEV : PRO;

export const globalConf: iConf = {
    aId: '',
    resLen: 1024 * 10,
    reqLen: 1024 * 10,
    isAjax: false,
    isJsError: true,
    isPv: true,
    isPerformance: true,
    appType: 'h5',
    appVersion: '',
    uId: '',
    ignore: '',
    getMaxLen: 2048,
    collectionRate: 1
};
