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
    prefix: '/api',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt'
  },

  css: [
    '~/styles/_app.scss'
  ],
})
