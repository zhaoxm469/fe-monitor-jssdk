# 前端监控上报SDK

## 使用

```js
	const fmr = new Fmr({
		aId:'xxxxx',
		spa:true,
	});

	fmr.report({
		// 必填创建自定义监控项时自动生成
		category: 100, 
		msg: 'hello world',
		// 自定义字段，支持c1~c5共5个字段
		c1: 'xx' 
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
