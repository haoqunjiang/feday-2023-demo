import { type UserConfig } from 'vite';
import * as path from 'node:path';
import * as process from 'node:process';
import vue3 from '@vitejs/plugin-vue';
import vue27 from '@vitejs/plugin-vue2';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const vueVersion = process.env.VUE_VERSION === '2' ? 2 : 3;

// https://vitejs.dev/config/

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
  define: {
    'import.meta.env.VUE_VERSION': JSON.stringify(JSON.stringify(vueVersion)),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      vue:
        vueVersion === 2
          ? path.resolve(
              __dirname,
              './node_modules/vue2/dist/vue.runtime.esm.js',
            )
          : path.resolve(
              __dirname,
              './node_modules/vue3/dist/vue.runtime.esm-bundler.js',
            ),
      'vue-demi':
        vueVersion === 2
          ? path.resolve(
              __dirname,
              './node_modules/vue-demi/lib/v2.7/index.mjs',
            )
          : path.resolve(__dirname, './node_modules/vue-demi/lib/v3/index.mjs'),
      'vue-router':
        vueVersion === 2
          ? path.resolve(
              __dirname,
              './node_modules/vue2-vue-router/dist/vue-router.esm.browser.js',
            )
          : path.resolve(
              __dirname,
              './node_modules/vue3-vue-router/dist/vue-router.mjs',
            ),
      'component-library': path.resolve(
        __dirname,
        '../../packages/component-library/src/index.ts',
      ),
    },
  },
  build: {
    outDir: `dist/vue${vueVersion}`,
  },
  server: {
    port: vueVersion === 2 ? 8002 : 8003,
  },
};
export default userConfig;
