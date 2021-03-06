import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import babel from '@rollup/plugin-babel';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import path from 'path';

import pkg from './package.json';

const extensions = ['.js', '.ts'];

const resolve = (...args) => path.resolve(__dirname, ...args);

export default defineConfig([
    {
        input: resolve('./src/main.ts'),
        output: [
            {
                file: resolve('./', pkg.main),
                // 暴露外部的全局变量名称
                format: 'umd',
                name: 'zerReport'
            },
            {
                file: resolve('./', pkg.module),
                format: 'es',
                name: pkg.name
            }
        ],
        plugins: [
            typescript({
                declarationDir: path.join(__dirname, './dist/'),
                declaration: true
            }),
            nodeResolve({
                extensions,
                modulesOnly: true
            }),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**',
                extensions
            }),
            terser(),
            replace({
				'process.env.NODE_ENV': JSON.stringify('production'),
				'APP_VERSION': JSON.stringify(pkg.version)
            })
        ]
    },
    {
        // 生成 .d.ts 类型声明文件
        input: resolve('./src/main.ts'),
        output: {
            file: resolve('./dist/index.d.ts'),
            format: 'es'
        },
        plugins: [dts()]
    }
]);
