import ts from 'rollup-plugin-typescript2';  // 相当于ts-loader
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 用于解析第三方模块
import serve from 'rollup-plugin-serve';
import path from 'path';

export default {
    input: 'src/index.ts',
    output: {
        format: 'iife',
        file: path.resolve(__dirname, 'dist/bundle.js'),
        sourcemap: true,
    },
    plugins: [
        nodeResolve({
            extensions: ['.js', '.ts']
        }),
        ts({
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        }),
        serve({
            openPage: path.resolve(__dirname, 'public/index.html'),
            contentBase: '',
            port: 3000
        })
    ]
}