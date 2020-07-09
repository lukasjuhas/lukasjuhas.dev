import parseArgs from 'minimist';

import pkg from './package.json';

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: 'hostname',
    p: 'port',
  },
  string: ['H'],
  unknown: parameter => false,
});

const port = argv.port || process.env.PORT || process.env.npm_package_config_nuxt_port || '3000';
const host =
  argv.hostname || process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost';

export default {
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`,
    GOODREADS_API_KEY: process.env.GOODREADS_API_KEY || 'krvm3xRqFvtk0fJpqaA',
  },

  head: {
    title: pkg.author,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Aleo:400,700',
      },
    ],
  },

  loading: { color: '#000' },

  manifest: {
    background_color: '#fff',
  },

  css: [
    {
      src: 'simple-flexbox-grid',
      lang: 'css',
    },
    '~/assets/styles/global.scss',
  ],

  buildModules: ['@nuxt/typescript-build'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
  ],

  styleResources: {
    scss: ['~/assets/styles/_mixins.scss', '~/assets/styles/_variables.scss'],
  },

  'google-analytics': {
    id: 'UA-85525050-1',
  },

  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.googleapis.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: 'https://fonts.gstatic.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
    ],
  },
};
