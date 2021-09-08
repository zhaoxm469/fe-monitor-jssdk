import { clientReport } from '../../report';
import { PerformanceLog } from '../../types/performance';

export default class FePerformanceLog {
    downTime = 150;
    downTimer: any;

    constructor() {
        this.init();
    }
    init() {
        this.downTimer = setInterval(() => {
            const data = this.getExceptPaintInfo();
            if (data && data.analysisTime >= 0 && this.downTimer) {
                clearInterval(this.downTimer);
                clientReport(data);
            }
        }, this.downTime);
    }
    getExceptPaintInfo() {
        if (
            !window.performance.getEntriesByType('navigation') ||
            !window.performance.getEntriesByType('navigation').length
        ) {
            return undefined;
        }

        const performanceNavigationTiming = window.performance.getEntriesByType(
            'navigation'
        )[0] as PerformanceNavigationTiming;

        const {
            // 浏览器与服务器之间连接建立（所有握手和认证过程全部结束）的时间戳，如果使用了持续连接，则与 fetchStart 一致。
            connectEnd,
            // HTTP 请求开始向服务器发送时的时间戳，如果使用了持续连接，则与 fetchStart 一致。
            connectStart,
            decodedBodySize,
            // 当前文档解析完成的时间戳。
            domComplete,
            // 需要立即执行的脚本已经被执行的时间戳。
            domContentLoadedEventEnd,
            // 需要被执行的脚本已经被解析的时间戳。
            domContentLoadedEventStart,
            // 当前网页DOM结构解析完成，开始加载内嵌资源时的时间戳。
            domInteractive,
            // DNS 查询结束时间。
            domainLookupEnd,
            // 域名查询开始的时间戳，如果使用了持续连接或者缓存，则与 fetchStart 一致。
            domainLookupStart,
            // 属性就是该资源所需的合计时间。与 NetWork 选项中的 Timing 中的时间差不多。
            duration,
            encodedBodySize,
            entryType,
            fetchStart,
            initiatorType,
            loadEventEnd,
            loadEventStart,
            name,
            nextHopProtocol,
            redirectCount,
            redirectEnd,
            redirectStart,
            requestStart,
            // 服务器向浏览器结束发送数据的时间。
            responseEnd,
            responseStart,
            secureConnectionStart,
            startTime,
            transferSize,
            type,
            unloadEventEnd,
            unloadEventStart
        } = performanceNavigationTiming;

        // //重定向时间
        const redirectTime = redirectEnd - redirectStart,
            //dns查询耗时
            dnsTime = domainLookupEnd - domainLookupStart,
            // TTFB 读取页面第一个字节的时间
            ttfbTime = responseStart - startTime,
            //DNS 缓存时间
            appcacheTime = domainLookupStart - fetchStart,
            //卸载页面的时间
            unloadTime = unloadEventEnd - unloadEventStart,
            //tcp连接耗时
            tcpTime = connectEnd - connectStart,
            //request请求耗时
            reqTime = responseEnd - responseStart,
            //解析dom树耗时
            analysisTime = domComplete - domInteractive,
            //白屏时间
            blankTime = domInteractive - fetchStart,
            //domReadyTime
            domReadyTime = domContentLoadedEventEnd - fetchStart,
            // 页面完全加载时间（load）
            pageLoadTime = loadEventStart - fetchStart;

        const params: PerformanceLog = {
            redirectTime,
            dnsTime,
            ttfbTime,
            appcacheTime,
            unloadTime,
            tcpTime,
            reqTime,
            analysisTime,
            blankTime,
            domReadyTime,
            pageLoadTime,
            level: 'performance',
            category: ''
        };
        return params;
    }
}
