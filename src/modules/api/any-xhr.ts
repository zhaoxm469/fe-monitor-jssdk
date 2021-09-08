type AnyObj = {
    [x in string]?: any;
};

class AnyXHR {
    XHR: XMLHttpRequest | undefined;
    execedHooks: AnyObj = {};
    hooks: AnyObj = {};

    static instance: AnyXHR;

    /**
     * 构造函数
     * @param {*} hooks
     * @param {*} execedHooks
     */
    constructor(hooks = {}, execedHooks = {}) {
        // 单例
        if (AnyXHR.instance) {
            return AnyXHR.instance;
        }

        this.XHR = window.XMLHttpRequest as any;

        this.hooks = hooks;
        this.execedHooks = execedHooks;
        this.init();

        AnyXHR.instance = this;
    }

    /**
     * 初始化 重写xhr对象
     */
    init() {
        let _this = this;

        // @ts-ignore
        window.XMLHttpRequest = function () {
            // @ts-ignore
            this._xhr = new _this.XHR();

            _this.overwrite(this);
        };
    }

    /**
     * 添加勾子
     * @param {*} key
     * @param {*} value
     */
    add(key: string, value: Function, execed = false) {
        if (execed) {
            this.execedHooks[key] = value;
        } else {
            this.hooks[key] = value;
        }
        return this;
    }

    /**
     * 处理重写
     * @param {*} xhr
     */
    overwrite(proxyXHR: any) {
        for (let key in proxyXHR._xhr) {
            if (typeof proxyXHR._xhr[key] === 'function') {
                this.overwriteMethod(key, proxyXHR);
                continue;
            }

            this.overwriteAttributes(key, proxyXHR);
        }
    }

    /**
     * 重写方法
     * @param {*} key
     */
    overwriteMethod(key: string, proxyXHR: AnyObj) {
        let hooks = this.hooks;
        let execedHooks = this.execedHooks;

        proxyXHR[key] = (...args: any) => {
            // 拦截
            if (hooks[key] && hooks[key].call(proxyXHR, args) === false) {
                return;
            }

            // 执行方法本体
            const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args);

            // 方法本体执行后的钩子
            execedHooks[key] && execedHooks[key].call(proxyXHR._xhr, res);

            return res;
        };
    }

    /**
     * 重写属性
     * @param {*} key
     */
    overwriteAttributes(key: string, proxyXHR: any) {
        Object.defineProperty(
            proxyXHR,
            key,
            this.setProperyDescriptor(key, proxyXHR)
        );
    }

    /**
     * 设置属性的属性描述
     * @param {*} key
     */
    setProperyDescriptor(key: string, proxyXHR: any) {
        let obj = Object.create(null);
        let _this = this;

        obj.set = function (val: any) {
            // 如果不是on打头的属性
            if (!key.startsWith('on')) {
                proxyXHR['__' + key] = val;
                return;
            }

            if (_this.hooks[key]) {
                this._xhr[key] = function (...args: any) {
                    _this.hooks[key].call(proxyXHR), val.apply(proxyXHR, args);
                };

                return;
            }

            this._xhr[key] = val;
        };

        obj.get = function () {
            return proxyXHR['__' + key] || this._xhr[key];
        };

        return obj;
    }

    /**
     * 获取实例
     */
    getInstance() {
        return AnyXHR.instance;
    }

    /**
     * 删除钩子
     * @param {*} name
     */
    rmHook(name: string, isExeced = false) {
        let target = isExeced ? this.execedHooks : this.hooks;
        delete target[name];
    }

    /**
     * 清空钩子
     */
    clearHook() {
        this.hooks = {};
        this.execedHooks = {};
    }

    /**
     * 取消监听
     */
    unset() {
        // @ts-ignore
        window.XMLHttpRequest = this.XHR;
    }

    /**
     * 重新监听
     */
    reset() {
        // @ts-ignore
        AnyXHR.instance = null;
        AnyXHR.instance = new AnyXHR(this.hooks, this.execedHooks);
    }
}

export default AnyXHR;
