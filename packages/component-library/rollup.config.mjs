// @ts-check
import * as fs from 'node:fs';
import dts from 'rollup-plugin-dts';
import { escapeRegExp } from 'lodash-es';
import alias from '@rollup/plugin-alias';

/** @type {import('./package.json')} */
const pkg = JSON.parse(
  fs.readFileSync('./package.json', { encoding: 'utf-8' }),
);

if ('dependencies' in pkg) {
  throw new Error('请将依赖项从 dependencies 移动到 peerDependencies');
}

export default [2, 3].map(
  /** @returns {import('rollup').RollupOptions} */
  (version) => ({
    external: [
      ...[...Object.keys(pkg.peerDependencies ?? {})].flatMap((name) => [
        name,
        new RegExp(escapeRegExp(name + '/')),
      ]),
      /node_modules/,
    ],
    onwarn: (warning) => {
      throw new Error(warning.message);
    },
    input: `./dist-types/vue${version}/index.d.ts`,
    plugins: [
      alias({
        entries: [
          { find: 'vue2', replacement: 'vue' },
          { find: 'vue3', replacement: 'vue' },
        ],
      }),
      dts({
        respectExternal: true,
      }),
    ],
    output: [
      {
        file: pkg.exports['./vue' + version].require.replace(
          /\.cjs$/,
          '.d.cts',
        ),
      },
      {
        file: pkg.exports['./vue' + version].import.replace(/\.js$/, '.d.ts'),
      },
    ],
  }),
);
