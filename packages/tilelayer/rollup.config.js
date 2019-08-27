import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'lib/tilelayer.js',
  output: {
    file: 'dist/tilelayer.js',
    format: 'umd',
    name: 'cartoTileLayer'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),

    commonjs()
  ]
};
