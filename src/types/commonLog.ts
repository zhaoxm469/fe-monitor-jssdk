export type CategoryType =
    | 'js'
    | 'resource'
    | 'promise'
    | 'console.error'
    | 'vue'
    | '';

export type LeaveType = 'error' | 'performance' | 'api' | 'pv' | '';

export interface CommonLog {
    // 用户ID
    uid?: string;
    // 级别
    level: LeaveType;
    // 分类
    category: CategoryType;
    // 当前发生事件的页面
    pageLocation?: string;
    // 屏幕视口大小
    viewPoint?: string;
    // 用户触发事件的行为类型
    handleType?: string;
    // 用户触发事件的行为类型
    selector?: string;
    // 来源
    referrer?: string;
    // 网页可是区域宽高
    pageWh?: string;
}
