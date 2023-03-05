// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  rootDir: __dirname,
  srcDir: './src',

  modules: [
    '@nuxtjs/device',
    '@pinia/nuxt',
    '@nuxtjs/strapi'
  ],

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    version: 'v3',
    cookie: {},
    cookieName: 'strapi_jwt'
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
})
