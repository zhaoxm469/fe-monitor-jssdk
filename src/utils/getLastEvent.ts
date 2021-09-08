export let lastEvent: any = null;

['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(
    (eventType) => {
        document.addEventListener(
            eventType,
            (event) => {
                lastEvent = event;
            },
            {
                capture: true,
                passive: true
            }
        );
    }
);

// 获取Event上的信息
export function getEventInfo() {
    let data = {
        readXPath: '',
        clientX: -1,
        clientY: -1
    };
    if (lastEvent && lastEvent.path) {
        data = {
            readXPath: readXPath([...lastEvent.path][0] as HTMLElement),
            clientX: lastEvent.clientX || -1,
            clientY: lastEvent.clientY || -1
        };
        lastEvent = null;
    }
    return data;
}

// 找到元素的 xpath 路径
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
