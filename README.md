# 前端监控上报SDK

## 接入Vue

```js

import zer from 'zer-report'

zer({
	aId:'123123',
	appType:Vue
});

```

## 接入H5

```js

import zer from 'zer-report'
zer.aId = '123123123';

```

## 发送测试代码

```js
// 控制台执行
zerReport.testPv();
```

## 自定义信息上报

```js
// 控制台执行
zerReport.send({
	id:'',
});
```

## script 命令

开发, 预览. 访问地址对应 /examples/index.html 页面

* npm run dev  

打包

* npm run build

推送到npm远程

* npm run npmp

运行测试用例

* npm run test

输出可视化测试覆盖报表

* npm run coverage
