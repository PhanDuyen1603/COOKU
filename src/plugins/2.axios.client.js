import axios from 'axios';

export default defineNuxtPlugin(() => {
  const { $config } = useNuxtApp()
  const strapiBaseUri = unref($config).public.strapi.url
  const instance = axios.create({
    baseURL: strapiBaseUri,
    timeout: 3000,
  });

  return {
    provide: {
      axios: instance
    }
  }
})