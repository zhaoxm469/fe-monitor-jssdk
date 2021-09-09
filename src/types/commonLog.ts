export type CategoryType =
    | 'js'
    | 'resource'
    | 'unhandledrejection'
    | 'console.error'
    | 'vue'
    | 'xhr'
    | 'fetch'
    | 'pageTime'
    | 'collapse'
    | '';

export type LeaveType = 'error' | 'performance' | 'api' | 'pv' | '';

export interface CommonLog {
    // 应用ID
    aId?: string;
    // 用户ID
    uId?: string;
    // 应用版本号
    appVersion?: string;
    // 自定义的用户id
    uuid?: string;
    // 级别
    level: LeaveType;
    // 分类
    category: CategoryType;
    // 当前发生事件的页面
    pageLocation?: string;
    // 屏幕视口大小
    devicePixelRatio?: number;
    // 用户触发事件的行为类型
    handleType?: string;
    // 用户触发事件的行为类型
    selector?: string;
    // 元素X坐标
    clientX?: number;
    // 元素Y坐标
    clientY?: number;
    // 客户端UA标识
    ua?: string;
    // 来源
    referrer?: string;
    // 网页可是区域宽高
    pageWh?: string;
    // 用户当前网络状态
    effectiveType?: string;
}
