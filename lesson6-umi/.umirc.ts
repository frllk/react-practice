import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/layout',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/about', component: '@/pages/about' },
        { path: '/more', component: '@/pages/more' },
        { path: '/more/list', component: '@/pages/more/list' },
        {
          path: '/product',
          component: '@/pages/product/_layout',
          routes: [
            {
              path: '/product/:id',
              component: '@/pages/product/[id]'
            },
          ]
        },
        { component: '@/pages/404' },
      ],
    },
  ],

});
