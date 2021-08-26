import { globalConf } from '../../conf/global';
import { clientReport } from '../../report';
import { ApiErrJsonEnum, ApiErrorInfo, errJsonEnum } from '../../types';

const parseUrl = function (value: string | undefined) {
    return value && 'string' == typeof value
        ? value.replace(/^(https?:)?\/\//, '').replace(/\?.*$/, '')
        : '';
};

const getCommonInfo = ({
    httpStatusCode = 0,
    sendBeginTime,
    apiUrl,
    httpSuccess = false,
    totalTime,
    msg,
    type
}: any): ApiErrorInfo => {
    return {
        [ApiErrJsonEnum.httpStatusCode]: httpStatusCode,
        [ApiErrJsonEnum.sendBeginTime]: sendBeginTime,
        [ApiErrJsonEnum.apiUrl]: apiUrl,
        [ApiErrJsonEnum.httpSuccess]: httpSuccess,
        [ApiErrJsonEnum.totalTime]: totalTime,
        [ApiErrJsonEnum.msg]: msg,
        [errJsonEnum.level]: 'api',
        [ApiErrJsonEnum.type]: type
    };
};

export class FeApiMonitor {
    constructor() {
        this.init();
    }
    init() {
        this.hackFetch();
        this.hackXmlHttp();
    }
    // 重写xmlHttp
    hackXmlHttp() {
        // 如果返回过长，会被截断，最长1000个字符
        if ('function' == typeof window.XMLHttpRequest) {
            let begin = 0,
                apiUrl = '';
            const oldXmlHttpRequest = window.XMLHttpRequest;
            (window as any).XMLHttpRequest = function () {
                const xhr = new oldXmlHttpRequest();
                if (!xhr.addEventListener) return xhr;
                const open = xhr.open,
                    send = xhr.send;

                xhr.open = function (method: string, url?: string) {
                    const data: any =
                        1 === arguments.length
                            ? [arguments[0]]
                            : Array.apply(null, arguments as any);
                    apiUrl = parseUrl(url);
                    open.apply(xhr, data);
                };
                xhr.send = function () {
                    begin = Date.now();
                    const data: any =
                        1 === arguments.length
                            ? [arguments[0]]
                            : Array.apply(null, arguments as any);
                    send.apply(xhr, data);
                };

                xhr.onreadystatechange = function () {
                    if (apiUrl && 4 === xhr.readyState) {
                        const time = Date.now() - begin;

                        const msg =
                            xhr.responseText.substr(
                                0,
                                globalConf.parameterLen
                            ) || '';

                        const params = getCommonInfo({
                            sendBeginTime: begin,
                            apiUrl,
                            httpSuccess: true,
                            totalTime: time,
                            msg,
                            type: 'xml'
                        });
                        // 发送成功
                        if (xhr.status >= 200 && xhr.status <= 299) {
                            const status = xhr.status || 200;
                            if ('function' == typeof xhr.getResponseHeader) {
                                const r = xhr.getResponseHeader('Content-Type');
                                if (r && !/(text)|(json)/.test(r)) return;
                            }
                            params[ApiErrJsonEnum.httpStatusCode] = status;
                        } else {
                            params[ApiErrJsonEnum.httpStatusCode] =
                                xhr.status || 0;
                            params[ApiErrJsonEnum.httpSuccess] = false;
                        }

                        clientReport(params);
                    }
                };
                return xhr;
            };
        }
    }
    // 重写Fetch
    hackFetch() {
        if (!window.fetch) return;
        const oldFetch = window.fetch;
        const params = getCommonInfo({
            type: 'fetch'
        });

        (window as any).fetch = function (t: any) {
            const arg: any =
                1 === arguments.length
                    ? [arguments[0]]
                    : Array.apply(null, arguments as any);

            const begin = Date.now(),
                url = (t && 'string' != typeof t ? t.url : t) || '',
                page = parseUrl(url as string);

            params[ApiErrJsonEnum.apiUrl] = page;
            params[ApiErrJsonEnum.sendBeginTime] = begin;

            if (!page) return oldFetch.apply(window, arg);
            return oldFetch
                .apply(window, arg)
                .then(function (e) {
                    const response = e.clone(),
                        headers = response.headers;

                    const totalTime = +new Date() - begin;

                    if (headers && 'function' === typeof headers.get) {
                        const ct = headers.get('content-type');
                        if (ct && !/(text)|(json)/.test(ct)) return e;
                    }

                    response.text().then(function (res) {
                        params[ApiErrJsonEnum.totalTime] = totalTime;
                        params[ApiErrJsonEnum.msg] = !response.ok
                            ? res.substr(0, globalConf.parameterLen)
                            : '';
                        params[ApiErrJsonEnum.httpSuccess] = !!response.ok;
                        params[ApiErrJsonEnum.httpStatusCode] = e.status;

                        clientReport(params);
                    });
                    return e;
                })
                .catch((error) => {
                    const totalTime = +new Date() - begin;
                    params[ApiErrJsonEnum.totalTime] = totalTime;
                    params[ApiErrJsonEnum.msg] =
                        'fetch-catch -> ' + error?.message;
                    clientReport(params);
                });
        };
    }
}
