import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import summary from 'rollup-plugin-summary';

export default {
  input: 'index.js',
  output: {
    file: 'index.bundled.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({
      preventAssignment: false,
      'Reflect.decorate': 'undefined',
      __DEV__: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    serve({
      historyApiFallback: true,
    }),
    resolve(),
    terser({
      ecma: 2020,
      module: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};
