# 前端监控JS SDK

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


