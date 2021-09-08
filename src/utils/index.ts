/*
 * @Author: zhaoxingming
 * @Date: 2021-08-24 14:46:39
 * @LastEditTime: 2021-09-08 18:42:07
 * @LastEditors: vscode
 * @Description:
 *
 */
import { lastEvent } from './getLastEvent';

export function guid() {
    return 'xxxx-xxxx-4xxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function isFunction(val: any) {
    return typeof val === 'function';
}

// 函数toString方法
export const fnToString = function (e: string) {
    return function () {
        return e + '() { [native code] }';
    };
};

/**
 * @description: 判断是否位数组
 */
export function isArray(value: any) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

export function getSelector() {
    if (lastEvent && lastEvent.path) {
        console.log(lastEvent);
        return readXPath([...lastEvent.path][0] as HTMLElement);
    }
    return '';
}

function readXPath(element: HTMLElement): any {
    if (element.id !== '' && !!element.id) {
        //判断id属性，如果这个元素有id，则显 示//*[@id="xPath"]  形式内容
        return '//*[@id="' + element.id + '"]';
    }

    //这里需要需要主要字符串转译问题，可参考js 动态生成html时字符串和变量转译（注意引号的作用）
    if (element == document.body) {
        //递归到body处，结束递归
        return element.tagName.toLowerCase();
    }

    let ix = 1,
        siblings: any = element?.parentNode?.childNodes; //同级的子元素

    if (!siblings) return '';
    for (var i = 0, l = siblings.length; i < l; i++) {
        const sibling = siblings[i],
            tagName = sibling.tagName;

        //如果这个元素是siblings数组中的元素，则执行递归操作
        if (sibling == element) {
            return (
                readXPath(element.parentNode as HTMLElement) +
                '>' +
                element.tagName.toLowerCase() +
                '[' +
                ix +
                ']'
            );
            //如果不符合，判断是否是element元素，并且是否是相同元素，如果是相同的就开始累加
        } else if (sibling.nodeType == 1 && tagName == element.tagName) {
            ix++;
        }
    }
}
