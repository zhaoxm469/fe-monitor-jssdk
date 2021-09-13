#!/usr/bin/env zx

const { version } = require('../package.json');
const newFileName = `index.umd${version}.js`;
const CDN_PATH = 'https://cdn.nucarf.cn/common/v1.0/js/zer/'

await $` cp ./dist/index.umd.js  ./cdn_common/js/zer/${newFileName}`

cd('./cdn_common')

await $` git pull `
await $` git add .`
await $` git commit -m 'refactor: 新增前端监控sdk , ver:${version}'`
await $` git push `

await $` clear`

console.log(`\n ${chalk.green('发布成功！, 当前版本: ' + version)} \n`)
console.log(`CDN访问地址：${chalk.cyan(CDN_PATH + newFileName)} \n`)
console.log(`NPM安装地址：${chalk.cyan('npm install -S zer-report')} \n\n`)