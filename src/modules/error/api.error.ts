import { reporter } from '../../reporter';

export function apiError() {
    // 覆写XMLHttpRequest API
    if (!window.XMLHttpRequest) return;
    const http = window.XMLHttpRequest;
    const _oldSend = http.prototype.send;
    const _handleEvent = (event: any) => {
        if (
            event &&
            event.currentTarget &&
            event.currentTarget.status !== 200
        ) {
            reporter(event);
        }
    };
    http.prototype.send = function (...arg: any) {
        if (this['addEventListener']) {
            this['addEventListener']('error', _handleEvent);
            this['addEventListener']('load', _handleEvent);
            this['addEventListener']('abort', _handleEvent);
            this['addEventListener']('close', _handleEvent);
        } else {
            var _oldStateChange = this['onreadystatechange'];
            this['onreadystatechange'] = function (event) {
                if (this.readyState === 4) {
                    _handleEvent(event);
                }
                _oldStateChange && _oldStateChange.apply(this, arg);
            };
        }
        return _oldSend.apply(this, arg);
    };

    // 覆写fetch API
    if (!window.fetch) return;
    var _oldFetch = window.fetch;
    (window as any).fetch = function (...arg: any) {
        return _oldFetch
            .apply(this, arg)
            .then(function (res: any) {
                if (!res.ok) {
                    // True if status is HTTP 2xx
                    reporter(res);
                }
                return res;
            })
            .catch(function (error) {
                reporter(error);
            });
    };
}
