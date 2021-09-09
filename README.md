# 前端监控JS SDK

## 接入Vue

```js
import zer from 'zer-report'

zer({
	aId:'xxxx-xxxx-xxxx',
	appType:Vue
});
```

## 接入H5

```js

import zer from 'zer-report'
zer({
	aId:'xxxx-xxxx-xxxx',
});

```

## CDN 方式引用

```html

<script src="xxx"></script>
<script>
	zerReport({
		aId:'xxxx-xxxx-xxxx',
	})
</script>

```

## config  

参数|说明|类型|是否必填|默认值
-----|-----|-----|-----|-----
aId|平台创建的应用APPID|string|是|-
resLen|上报参数长度|string|否|1024*10
reqLen|上报参数长度|string|否|1024*10
isAjax|是否上报ajax性能数据，错误等信息|boolean|否|true
isJsError|是否上报JS报错|boolean|否|true
isPv|是否上报PV数据|boolean|否|true
isPerformance|是否上报前端性能|boolean|否|true
appType|当前应用类型|string | Function |否|'h5'
ignore|当前应用类型|RegExp | string | (RegExp|string)[] |否|''
