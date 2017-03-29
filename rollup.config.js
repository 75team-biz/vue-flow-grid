import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: './index.js',
  dest: 'dist/index.js',
  format: 'umd',
  context: 'this',
  sourceMap: true,
  moduleName: 'FlowGrid',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js']
    }),
    commonjs(),
    buble()
  ]
};