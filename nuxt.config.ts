import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/icon'],

  plugins: [
    '~/plugins/fontawesome.ts',
  ],

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  compatibilityDate: '2024-08-15',

  // Extending routes to add custom names
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'home',
        path: '/',
        file: '~/pages/index.vue'
      })

      pages.push({
        name: 'product',
        path: '/productpage',
        file: '~/pages/productpage.vue'
      })

      pages.push({
        name: 'category',
        path: '/category',
        file: '~/pages/category.vue'
      })

      pages.push({
        name: 'checkout',
        path: '/checkout',
        file: '~/pages/checkout.vue'
      })

      pages.push({
        name: 'search',
        path: '/searchresult',
        file: '~/pages/searchresult.vue'
      })
    }
  },
});
