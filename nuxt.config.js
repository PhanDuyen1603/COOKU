// https://nuxt.com/docs/api/configuration/nuxt-config
const strapiBaseUri = process.env.STRAPI_URL || "http://localhost:1337";
export default defineNuxtConfig({
  rootDir: __dirname,
  srcDir: './src',

  components: {
    dirs: [
      {
        global: true,
        path: '~/components',
        extensions: ['vue'],
      },
      {
        global: true,
        path: '~/components/global',
        pathPrefix: false,
        extensions: ['vue'],
      },
    ]
  },

  modules: [
    '@nuxtjs/strapi',
    '@nuxtjs/device',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  i18n: {
    lazy: true,
    strategy: 'no_prefix',
    defaultLocale: 'vn',
    langDir: 'locales',
    locales: [
      { code: 'vn', iso: 'vn', file: 'vn.json' }
    ],
    vueI18n: {
      legacy: false,
      globalInjection: true,
      silentTranslationWarn: true,
      fallbackWarn: false,
      missingWarn: false,
    },
  },

  strapi: {
    url: strapiBaseUri,
    version: 'v3',
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '~/styles/reset.css',
    '~/styles/_app.scss',
  ],

  script: [
    {
      src: 'bootstrap/dist/js/bootstrap.bundle.min.js'
    }
  ],
  publicRuntimeConfig: {
    baseURL: strapiBaseUri,
  }
})
