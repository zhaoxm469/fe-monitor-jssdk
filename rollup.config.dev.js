import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
import { defineConfig } from 'rollup';
import dev from 'rollup-plugin-dev';
import pkg from './package.json';
import path from 'path';

const extensions = ['.js', '.ts'];

const resolve = (...args) => path.resolve(__dirname, ...args);

export default defineConfig({
    input: resolve('./src/main.ts'),
    output: [
        {
            file: resolve('./', pkg.main),
            // 暴露外部的全局变量名称
            format: 'umd',
            name: 'Fmr',
            sourcemap: true
        },
        {
            file: resolve('./', pkg.module),
            format: 'es',
            name: pkg.name,
            sourcemap: true
        }
    ],
    plugins: [
        typescript({
            sourceMap: true
        }),
        nodeResolve({
            extensions,
            modulesOnly: true
        }),
        dev({
            port: '8888',
            host: 'localhost',
            spa: './examples/index.html',
            force: true,
        }),
        livereload(),
        replace({
			'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});

