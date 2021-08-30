/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 14:59:12
 * @LastEditTime: 2021-08-30 14:52:46
 * @LastEditors: vscode
 * @Description: 监听api接口性能
 */

import { baseUrl, globalConf } from '../../conf/global';
import { clientReport } from '../../report';
import { ApiJsonEnum, ApiErrorInfo, errJsonEnum } from '../../types';

const parseUrl = function (value: string | undefined) {
    return value && 'string' == typeof value
        ? value.replace(/^(https?:)?\/\//, '').replace(/\?.*$/, '')
        : '';
};

const setRequestParameters = ({
    httpStatusCode = 0,
    httpSuccess = false,
    sendBeginTime,
    totalTime,
    eventType,
    methods,
    apiUrl,
    msg,
    type
}: any): ApiErrorInfo => {
    return {
        [ApiJsonEnum.httpStatusCode]: httpStatusCode,
        [ApiJsonEnum.sendBeginTime]: sendBeginTime,
        [ApiJsonEnum.apiUrl]: apiUrl,
        [ApiJsonEnum.httpSuccess]: httpSuccess,
        [ApiJsonEnum.totalTime]: totalTime,
        [ApiJsonEnum.methods]: methods,
        [errJsonEnum.level]: 'api',
        [ApiJsonEnum.eventType]: eventType,
        [ApiJsonEnum.msg]: msg,
        [ApiJsonEnum.type]: type
    };
};

export default class FeApiMonitor {
    constructor() {
        this.init();
    }
    init() {
        this.hackFetch();
        this.hackXmlHttp();
    }
    // 重写xmlHttp
    hackXmlHttp() {
        let begin = 0,
            apiUrl = '',
            methods = '',
            eventType = '';

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
                methods = method;

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

            xhr.onreadystatechange = function (e: any) {
                eventType = e.type;

                if (apiUrl && 4 === xhr.readyState) {
                    const time = Date.now() - begin;

                    const msg =
                        // 如果返回过长，会被截断，最长1000个字符
                        xhr.responseText.substr(0, globalConf.parameterLen) ||
                        '';
                    console.log(apiUrl);
                    const params = setRequestParameters({
                        sendBeginTime: begin,
                        httpSuccess: true,
                        totalTime: time,
                        type: 'xml',
                        eventType,
                        methods,
                        apiUrl,
                        msg
                    });

                    // 发送成功
                    if (xhr.status >= 200 && xhr.status <= 299) {
                        const status = xhr.status || 200;
                        if ('function' == typeof xhr.getResponseHeader) {
                            const r = xhr.getResponseHeader('Content-Type');
                            if (r && !/(text)|(json)/.test(r)) return;
                        }
                        params[ApiJsonEnum.httpStatusCode] = status;
                    } else {
                        params[ApiJsonEnum.httpStatusCode] = xhr.status || 0;
                        params[ApiJsonEnum.httpSuccess] = false;
                    }

                    // 避免重复请求，判断如果是上报接口就不统计此接口性能
                    if (!apiUrl.includes(baseUrl.substring(8)))
                        clientReport(params);
                }
            };
            return xhr;
        };
    }
    // 重写Fetch
    hackFetch() {
        if (!window.fetch) return;
        const oldFetch = window.fetch;
        const params = setRequestParameters({
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

            params[ApiJsonEnum.apiUrl] = page;
            params[ApiJsonEnum.sendBeginTime] = begin;

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
                        params[ApiJsonEnum.totalTime] = totalTime;
                        params[ApiJsonEnum.msg] = !response.ok
                            ? res.substr(0, globalConf.parameterLen)
                            : '';
                        params[ApiJsonEnum.httpSuccess] = !!response.ok;
                        params[ApiJsonEnum.httpStatusCode] = e.status;

                        clientReport(params);
                    });
                    return e;
                })
                .catch((error) => {
                    const totalTime = +new Date() - begin;
                    params[ApiJsonEnum.totalTime] = totalTime;
                    params[ApiJsonEnum.msg] =
                        'fetch-catch -> ' + error?.message;
                    clientReport(params);
                });
        };
    }
}
