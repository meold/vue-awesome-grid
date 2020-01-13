import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import minimist from 'minimist';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';

const argv = minimist(process.argv.slice(2));

const baseConfig = {
  input: 'src/entry.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true
      }
    }),
    buble({
      objectAssign: 'Object.assign'
    })
  ]
};

// UMD/IIFE shared settings: externals and output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  'vue-runtime-helpers'
];
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'vue',
  vueRuntimeHelpers: 'vue-runtime-helpers'
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    external: external,
    output: {
      file: 'dist/vue-awesome-grid.esm.js',
      format: 'esm',
      exports: 'named',
      globals: globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 6
        }
      })
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'umd') {
  const umdConfig = {
    ...baseConfig,
    external: external,
    output: {
      compact: true,
      file: 'dist/vue-awesome-grid.umd.js',
      format: 'umd',
      name: 'vueAwesomeGrid',
      exports: 'named',
      globals: globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 6
        }
      })
    ]
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external: external,
    output: {
      compact: true,
      file: 'dist/vue-awesome-grid.min.js',
      format: 'iife',
      name: 'vueAwesomeGrid',
      exports: 'named',
      globals: globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 6
        }
      })
    ]
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
