/* eslint-disable vue/one-component-per-file */

import { createApp, h, Vue2 } from 'vue-demi';

import App from './App.vue';
import { routes } from './router';

async function main() {
  // @ts-expect-error
  const BASE_URL = import.meta.env.BASE_URL;
  let app;
  // @ts-expect-error
  if (import.meta.env.VUE_VERSION === '2') {
    Vue2!.config.productionTip = false;
    const VueRouter = (await import('vue2-vue-router' as any)).default;
    Vue2!.use(VueRouter);

    const router = new VueRouter({
      mode: 'history',
      base: BASE_URL,
      routes,
    });
    app = createApp({
      router,
      render: () => h(App),
    });
    console.log('Vue 2 app');
  } else {
    const { createRouter, createWebHistory } = await import(
      'vue3-vue-router' as any
    );
    const router = createRouter({
      // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
      history: createWebHistory(BASE_URL),
      routes, // short for `routes: routes`
    });
    app = createApp({
      router,
      render: () => h(App),
    });
    app.use(router);
    console.log('Vue 3 app');
  }

  app.mount('#app');
}

main();
