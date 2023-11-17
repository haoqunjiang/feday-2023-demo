import type { UserConfig } from 'vite';
import * as path from 'node:path';
import vue3 from '@vitejs/plugin-vue';
import vue27 from '@vitejs/plugin-vue2';
import * as fs from 'node:fs';
import * as process from 'node:process';
import { escapeRegExp } from 'lodash-es';

const vueVersion = process.env.VUE_VERSION === '2' ? 2 : 3;

/** @type {import('./package.json')} */
const pkg = JSON.parse(
  fs.readFileSync('./package.json', { encoding: 'utf-8' }),
);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const external = [...Object.keys(pkg.peerDependencies ?? {})].flatMap(
  (name) => [name, new RegExp(escapeRegExp(name + '/'))],
);
// 项目自定义的配置写在这里
const userConfig: UserConfig = {
  plugins: [
    vueVersion === 2
      ? vue27({
          // @ts-expect-error
          compiler: await import('vue2/compiler-sfc'),
        })
      : vue3({
          compiler: await import('vue3/compiler-sfc'),
        }),
  ],
  resolve: {
    alias: {},
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
    minify: false,
    cssMinify: false,
    target: 'es2022',
    outDir: `dist/vue${vueVersion}`,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external,
      output: {
        paths: {
          vue: 'vue-demi',
        },
      },
    },
  },
};
// https://vitejs.dev/config/
export default userConfig;
